import React, {useState, useEffect, useRef} from 'react';
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {ImageBookDropZone} from "@/components/image-book-dropzone";
import {Button} from "@/components/ui/button";
import {useEdgeStore} from "@/providers/edge-store-provider";
import {useForm} from "react-hook-form";
import imageCompression from "browser-image-compression";
import {createStore} from "@/actios/amtsilati-store";
import Image from "next/image";


export type StoreFormData = {
    id?: string;
    title: string;
    description: string;
    maximumPurchase: string;
    pageTotal: string;
    isbn?: string;
    width: string;
    height: string;
    price: string;
    cover: string;
};
type ModalFormAmtsilatiStoreProps = {
    isOpen:boolean;
    onClose:(open:boolean) => void;
    mode:string;
    data:StoreFormData | null;
    // onSave:(data:StoreFormData) => void;
}

// Modal Component
const ModalFormAmtsilatiStore = ({ isOpen, onClose, mode, data }:ModalFormAmtsilatiStoreProps) => {
    const { edgestore } = useEdgeStore();
    const [progress, setProgress] = useState<Number | null>(null);
    const [file, setFile] = useState<File>();
    const [formData, setFormData] = useState<StoreFormData | null>(null);
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, reset, getValues, watch, setValue } =
        useForm<StoreFormData>();

    const fileInputRef = useRef(null);

    const handleImageClick = () => {
        // Ketika gambar di klik, maka input file akan terbuka
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    // Update state jika mode adalah 'edit'
    useEffect(() => {
        console.log(mode, data)
        if (mode === 'edit' && data) {
            setValue("title", data.title)
            setValue("description", data.description)
            setValue("maximumPurchase", data.maximumPurchase)
            setValue("pageTotal", data.pageTotal)
            setValue("isbn", data.isbn)
            setValue("price", data.price)
            setValue("width", data.width)
            setValue("height", data.height)
            setValue("cover", data.cover)
        } else {
            reset()
        }
    }, [mode, data, reset, setValue]);

    const allValues = watch();
    const nonRequiredInputs: (keyof StoreFormData)[] = ["isbn"];
    const isAnyInputEmpty = Object.entries(allValues).some(([key, value]) => {
        return (
            !nonRequiredInputs.includes(key as keyof StoreFormData) && value === ""
        );
    });

    const onSubmit = async (data: StoreFormData) => {

        setLoading(true);
        setFormData(data);

        if (file) {
            const options = {
                maxSizeMB: 1,
                maxWidthOrHeight: 800,
                useWebWorker: true
            };
            try {
                const compressedFile = await imageCompression(file, options);
                const res = await edgestore.publicFiles.upload({
                    file: compressedFile,
                    onProgressChange: (progress) => {
                        setProgress(progress);
                    }
                });
                data.cover = res.url;
                await createStore(data);
                setFile(undefined);
                reset();
                setProgress(null);
                onClose(false)
                setLoading(false);
            } catch (error) {
                console.log("error saat kompress image ", error);
            }
        }
    };

    const modalClose = (open:boolean) =>{
     reset()
        console.log("colse")
        setValue("title","")
     onClose(open)
    }

    if (!isOpen) return null;

    return (
        <Dialog open={isOpen} onOpenChange={modalClose}>
            {/* Modal Content */}
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Add New Store</DialogTitle>
                </DialogHeader>

                {/* Form Inside Modal */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                    <div>
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            {...register("title", { required: true })}
                            className="w-full"
                            placeholder="Enter book title"
                        />
                    </div>

                    <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            rows={5}
                            id="description"
                            {...register("description", { required: true })}
                            className="w-full"
                            placeholder="Enter book description"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="maximumPurchase">Maximum Purchase</Label>
                            <Input
                                id="maximumPurchase"
                                type="number"
                                {...register("maximumPurchase", { required: true })}
                                className="w-full"
                                placeholder="Enter max purchase"
                            />
                        </div>

                        <div>
                            <Label htmlFor="pageTotal">Page Total</Label>
                            <Input
                                id="pageTotal"
                                type="number"
                                {...register("pageTotal", { required: true })}
                                className="w-full"
                                placeholder="Enter page total"
                            />
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="isbn">ISBN</Label>
                        <Input
                            id="isbn"
                            {...register("isbn", { required: false })}
                            className="w-full"
                            placeholder="Enter ISBN"
                        />
                    </div>

                    <div className="grid grid-cols-3">
                        <div className="col-span-2">
                            <div>
                                <Label htmlFor="price">Price</Label>
                                <Input
                                    id="price"
                                    type="number"
                                    {...register("price", { required: true })}
                                    className="w-full"
                                    placeholder="Enter price"
                                />
                            </div>

                            <div>
                                <Label htmlFor="width">Width</Label>
                                <Input
                                    id="width"
                                    type="number"
                                    {...register("width", { required: true })}
                                    className="w-full"
                                    placeholder="Width (mm)"
                                />
                            </div>
                            <div>
                                <Label htmlFor="height">Height</Label>
                                <Input
                                    id="height"
                                    type="number"
                                    {...register("height", { required: true })}
                                    className="w-full"
                                    placeholder="Height (mm)"
                                />
                            </div>
                        </div>
                        <div className="flex items-center justify-center">
                            <div>
                                <Label className="text-center block">Cover</Label>
                                {!file && data?.cover ? (
                                    <div
                                        className="mt-2 w-[100px] h-[150px] cursor-pointer"
                                        onClick={handleImageClick}
                                    >
                                        <Image src={data.cover} alt="cover" width={100} height={150} />
                                    </div>
                                ) : (
                                    /* Jika sudah ada file yang dipilih, tampilkan ImageBookDropZone */
                                    <ImageBookDropZone
                                        className="mt-2"
                                        width={100}
                                        height={150}
                                        value={file}
                                        onChange={(file) => setFile(file)}
                                    />
                                )}
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    style={{display: 'none'}}
                                    onChange={handleFileChange}
                                    accept="image/*"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Modal Footer with Submit Button */}
                    <DialogFooter>
                    <div className="w-full">
                            <Button
                                disabled={isAnyInputEmpty || loading || !file}
                                type="submit"
                                className="w-full"
                            >
                                Submit
                            </Button>
                            {progress !== null && (
                                <div className="h-3 w-full border rounded overflow-hidden mt-2">
                                    <div
                                        className="h-full bg-slate-400 transition-none duration-150"
                                        style={{ width: `${progress}%` }}
                                    ></div>
                                </div>
                            )}
                        </div>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default ModalFormAmtsilatiStore

