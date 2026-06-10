"use client";

import * as React from "react";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import logo from "@images/freshcart-logo.svg";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useSession } from "next-auth/react";
import { cartContextType, useCart } from "@/app/_context/cartContext";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

export default function NavigationMenuDemo() {
  const session = useSession();
  const username = session.data?.user?.name;
  const isUserAuthenticated = session.status === "authenticated";
  const { numberOfCartItems } = useCart() as cartContextType;
  return (
    <NavigationMenu className="max-w-none justify-between px-20 flex-0 sticky top-0">
      <div>
        <img src={logo.src} alt="logo" />
      </div>
      <div className="w-1/2">
        <input
          type="text"
          className="w-full py-3 px-5 border-2 rounded-2xl"
          placeholder="Search for products, brands and more"
        />
      </div>
      <NavigationMenuList className="text-lg">
        <NavigationMenuItem className="flex md:hidden">
          <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-100 gap-2 md:w-125 md:grid-cols-2 lg:w-150">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuList className="hidden md:flex">
          <NavigationMenuItem>
            <NavigationMenuLink asChild className="hover:bg-transparent">
              <Link href="/">Home</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild className="hover:bg-transparent">
              <Link href="/cart">shop</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild className="hover:bg-transparent">
              <Link href="/categories">Categories</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild className="hover:bg-transparent">
              <Link href="/brands">Brands</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>

        <NavigationMenuList className="hidden md:flex">
          <NavigationMenuItem>
            <CiHeart />
          </NavigationMenuItem>
          <NavigationMenuItem className="relative">
            <Link
              href="/cart"
              className="relative bg-transparent hover:bg-transparent"
            >
              <FaShoppingCart />
              {isUserAuthenticated && !!numberOfCartItems && (
                <span className="absolute -top-3 text-xs px-1 -right-2 bg-red-500 rounded-xl text-white">
                  {numberOfCartItems}
                </span>
              )}
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild className="hover:bg-transparent">
              {isUserAuthenticated ? (
                <Link href="/profile">{username}</Link>
              ) : (
                <Link href="/login">Sign in</Link>
              )}
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="flex flex-col gap-1 text-sm">
            <div className="leading-none font-medium">{title}</div>
            <div className="line-clamp-2 text-muted-foreground">{children}</div>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
