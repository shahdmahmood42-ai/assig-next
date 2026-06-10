"use client";
import { Button } from "@/components/ui/button";
import { deleteElementFromCart } from "./cart.actions";
import { toast } from "sonner";
import { cartContextType, useCart } from "../_context/cartContext";

export default function RemoveProductButton({ id }: { id: string }) {
  const { updateNumberOfCartItems } = useCart() as cartContextType;
  async function handleRemoveElement() {
    const res = await deleteElementFromCart(id);
    if (res == null) {
      toast.error("Error Occurred while deleting this product ", {
        position: "top-right",
        richColors: true,
      });
    } else {
      updateNumberOfCartItems(res);
      toast.success("Product deleted Successfully ", {
        position: "top-right",
        richColors: true,
      });
    }
  }
  return (
    <Button
      onClick={handleRemoveElement}
      variant="destructive"
      className="mt-2 w-full"
    >
      Remove
    </Button>
  );
}
