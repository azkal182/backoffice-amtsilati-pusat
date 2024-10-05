"use client";
import { testCreate } from "@/actios/test";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import React, { useState } from "react";

function generateRandomOrderIdWithDate(length = 5) {
  // Mendapatkan tanggal saat ini
  const today = new Date();
  const year = today.getFullYear().toString().slice(-2); // Dua digit terakhir tahun
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Bulan (01-12)
  const date = String(today.getDate()).padStart(2, "0"); // Tanggal (01-31)

  // Menggabungkan tanggal dengan ID acak
  const datePart = `${year}${month}${date}`; // Format: YYMMDD

  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomId = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomId += characters.charAt(randomIndex);
  }
  return `${datePart}${randomId}`; // Menggabungkan tanggal dan ID acak
}
const SampleData = ({ paymentMethod }: { paymentMethod: any }) => {
  const [orderId, setPrderId] = useState(generateRandomOrderIdWithDate());
  const [order, setOrder] = useState<any>({
    orderId: orderId,
    nis: "",
    noRek: "",
    name: "",
    total: "",
    paymentMethod: "",
    item: []
  });

  const [newItem, setNewItem] = useState({
    category: "",
    keterangan: "",
    jumlah: ""
  });

  const validateOrder = () => {
    const { nis, noRek, name, total, paymentMethod } = order;
    if (
      !nis ||
      !noRek ||
      !name ||
      !total ||
      !paymentMethod ||
      order.item.length === 0
    ) {
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validateOrder()) {
      alert("Semua field harus diisi.");
      return;
    }
    alert(JSON.stringify(order));
    testCreate(order);
  };

  const handleAddItem = () => {
    // Validasi item baru sebelum ditambahkan
    if (!newItem.category || !newItem.keterangan || !newItem.jumlah) {
      alert("Semua field item harus diisi.");
      return;
    }

    // Tambahkan item baru ke dalam state order.item
    setOrder((prevOrder: any) => ({
      ...prevOrder,
      item: [...prevOrder.item, newItem]
    }));

    // Reset form item setelah menambahkannya
    setNewItem({
      category: "",
      keterangan: "",
      jumlah: ""
    });
  };

  return (
    <div>
      {/* <form> */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-auto">
        <Card>
          <CardHeader>Order - #{orderId}</CardHeader>
          <CardContent>
            <div>
              <Label>NIS</Label>
              <Input
                placeholder="NIS"
                value={order.nis}
                onChange={(e) => {
                  setOrder((prevOrder: any) => ({
                    ...prevOrder,
                    nis: e.target.value
                  }));
                }}
              />
            </div>
            <div>
              <Label>No Rek</Label>
              <Input
                placeholder="No Rek"
                value={order.noRek}
                onChange={(e) => {
                  setOrder((prevOrder: any) => ({
                    ...prevOrder,
                    noRek: e.target.value
                  }));
                }}
              />
            </div>
            <div>
              <Label>Nama</Label>
              <Input
                placeholder="Nama"
                value={order.name}
                onChange={(e) => {
                  setOrder((prevOrder: any) => ({
                    ...prevOrder,
                    name: e.target.value
                  }));
                }}
              />
            </div>
            <div>
              <Label>Total</Label>
              <Input
                placeholder="Total"
                value={order.total}
                onChange={(e) => {
                  setOrder((prevOrder: any) => ({
                    ...prevOrder,
                    total: e.target.value
                  }));
                }}
              />
            </div>
            <div>
              <Label>Metode</Label>
              <Select
                required
                onValueChange={(value) => {
                  setOrder((prevOrder: any) => ({
                    ...prevOrder,
                    paymentMethod: value
                  }));
                }}
              >
                <SelectTrigger className="">
                  <SelectValue placeholder="Select Payment Method" />
                </SelectTrigger>
                <SelectContent>
                  {paymentMethod.map((item: any) => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>Item</CardHeader>
          <CardContent>
            <div>
              <Label>Category</Label>
              <Select
                required
                value={newItem.category}
                onValueChange={(value) => {
                  setNewItem((prev) => ({
                    ...prev,
                    category: value
                  }));
                }}
              >
                <SelectTrigger className="">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent onVolumeChange={(value) => {}}>
                  <SelectItem value="tabungan">Tabungan</SelectItem>
                  <SelectItem value="syahriyah">Syahriyah</SelectItem>
                  <SelectItem value="upt">UPT</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Keterangan</Label>
              <Input
                placeholder="Keterangan"
                value={newItem.keterangan}
                onChange={(e) => {
                  setNewItem((prev) => ({
                    ...prev,
                    keterangan: e.target.value
                  }));
                }}
              />
            </div>
            <div>
              <Label>Jumlah</Label>
              <Input
                placeholder="Jumlah"
                value={newItem.jumlah}
                onChange={(e) => {
                  setNewItem((prev) => ({
                    ...prev,
                    jumlah: e.target.value
                  }));
                }}
              />
            </div>
            <Button onClick={handleAddItem}>Tambah Item</Button>
          </CardContent>
        </Card>
      </div>
      <Button onClick={handleSubmit}>submit</Button>
      {/* </form> */}
    </div>
  );
};

export default SampleData;
