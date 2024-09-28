import {
    Tag,
    Users,
    Settings,
    SquarePen,
    LayoutGrid,
    LucideIcon,
    ShoppingBag,
    Calendar,
    FileImage,
    CreditCard
} from "lucide-react";

type Submenu = {
    href: string;
    label: string;
    active: boolean;
};

type Menu = {
    href: string;
    label: string;
    active: boolean;
    icon: LucideIcon;
    submenus: Submenu[];
};

type Group = {
    groupLabel: string;
    menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
    return [
        {
            groupLabel: "",
            menus: [
                {
                    href: "/dashboard",
                    label: "Dashboard",
                    active: pathname.includes("/dashboard"),
                    icon: LayoutGrid,
                    submenus: []
                }
            ]
        },
        {
            groupLabel: "Contents",
            menus: [
                {
                    href: "",
                    label: "Posts",
                    active: pathname.includes("/posts"),
                    icon: SquarePen,
                    submenus: [
                        {
                            href: "/posts",
                            label: "All Posts",
                            active: pathname === "/posts"
                        },
                        {
                            href: "/posts/new",
                            label: "New Post",
                            active: pathname === "/posts/new"
                        }
                    ]
                },
                {
                    href: "/calender",
                    label: "Calender",
                    active: pathname.includes("/calender"),
                    icon: Calendar,
                    submenus: []
                },
                {
                    href: "/amtsilati-store",
                    label: "Amtsilati Store",
                    active: pathname.includes("/amtsilati-store"),
                    icon: ShoppingBag,
                    submenus: []
                },
                {
                    href: "/poster",
                    label: "Poster",
                    active: pathname.includes("/poster"),
                    icon: FileImage,
                    submenus: []
                },
                {
                    href: "/pengurus",
                    label: "Pengurus",
                    active: pathname.includes("/pengurus"),
                    icon: Users,
                    submenus: []
                },
                {
                    href: "/syahriyah",
                    label: "Syahriyah",
                    active: pathname.includes("/syahriyah"),
                    icon: CreditCard,
                    submenus: []
                }
            ]
        },
        {
            groupLabel: "Settings",
            menus: [
                {
                    href: "/users",
                    label: "Users",
                    active: pathname.includes("/users"),
                    icon: Users,
                    submenus: []
                },
                {
                    href: "/account",
                    label: "Account",
                    active: pathname.includes("/account"),
                    icon: Settings,
                    submenus: []
                }
            ]
        }
    ];
}
