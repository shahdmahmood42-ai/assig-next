"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { ClearAllCart } from "./cart.actions";

export default function ClearCartButton() {
  async function ClearCart() {
    await ClearAllCart();
  }
  return (
    <Button onClick={ClearCart} variant="destructive">
      Clear Cart
    </Button>
  );
}
