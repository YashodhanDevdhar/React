import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { SidebarTrigger } from "./ui/sidebar";
import { Menu } from "lucide-react";

export function NavMenu() {
  return (
    <div className="flex items-center justify-center">
        <SidebarTrigger>
        <button className="p-2 rounded-md hover:bg-gray-200 transition flex items-center justify-center">
            <Menu className="w-6 h-6" />
        </button>
        </SidebarTrigger>
        <NavigationMenu className="mb-4 border-b p-2 shadow-sm">
            <NavigationMenuList className="flex space-x-4 ">
                <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                        <Link to="/" className="text-8xl font-bold hover:text-blue-600">Home</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                        <Link to="/products" className="text-8xl font-bold hover:text-blue-600">Products</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                        <Link to="/cart" className="text-8xl font-bold hover:text-blue-600">Cart</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    </div>
  );
}
