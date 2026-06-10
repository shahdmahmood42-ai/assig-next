"use client";
import { cartContextType, useCart } from "@/app/_context/cartContext";
import { addProductToCart } from "@/app/cart/cart.actions";
import { Button } from "@/components/ui/button";
import { MouseEvent } from "react";
import { ReactNode } from "react";
import { toast } from "sonner";
interface AddToCartButtonProps {
  id: string;
  classNames: string;
  children: ReactNode;
}
export default function AddToCartButton({
  id,
  classNames,
  children,
}: AddToCartButtonProps) {
  const { updateNumberOfCartItems } = useCart() as cartContextType;
  async function handleClick(e: MouseEvent) {
    e.preventDefault();
    const newItemsCount = await addProductToCart(id);
    if (newItemsCount != false) {
      toast.success("Product Added Successfully", { position: "top-right" });
      updateNumberOfCartItems(newItemsCount);
    } else {
      toast.error("Error Happened While Adding Product", {
        position: "top-right",
      });
    }
  }
  return (
    <Button onClick={handleClick} className={classNames}>
      {children}
    </Button>
  );
}
