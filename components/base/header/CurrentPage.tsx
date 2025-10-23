"use client";
import { navItems } from "@/lib/constants/navitems";
import { usePathname } from "next/navigation";

export function CurrentPage() {
	const pathname = usePathname();
	const currentPage =
		navItems.find((item) => item.href === pathname)?.label ?? "";
	return <h2 className="text-md md:text-lg font-bold">{currentPage}</h2>;
}
