"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { updateProductCount } from "./cart.actions";
import { toast } from "sonner";

export default function UpdateProductCountButton({
  isIncrement = false,
  id,
  newCount,
}: {
  isIncrement?: boolean;
  id: string;
  newCount: number;
}) {
  async function handleUpdateCount() {
    const numOfCartItems = await updateProductCount(id, newCount);
    if (numOfCartItems) {
      toast.success(
        `Product Count ${isIncrement ? "Incremented" : "Decremented"} Successfully`,
        { position: "top-right", richColors: true },
      );
    } else {
      toast.error("error", { position: "top-right", richColors: true });
    }
  }
  return (
    <Button onClick={handleUpdateCount} variant="outline">
      {isIncrement ? "+" : "-"}
    </Button>
  );
}
