"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useRef } from "react";
import { CreateCashOrder, CreateOnlineOrderAction } from "../cart.actions";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { cartContextType, useCart } from "@/app/_context/cartContext";
import { OrderPlaceType } from "@/api/types";

export default function Page() {
  const detailsInput = useRef<HTMLInputElement>(null);
  const phoneInput = useRef<HTMLInputElement>(null);
  const cityInput = useRef<HTMLInputElement>(null);
  const postalcodeInput = useRef<HTMLInputElement>(null);
  const { id } = useParams();
  const { updateNumberOfCartItems } = useCart() as cartContextType;
  const router = useRouter();
  async function handleCashOrder() {
    const obj: OrderPlaceType = {
      shippingAddress: {
        details: detailsInput.current?.value || "",
        phone: phoneInput.current?.value || "",
        city: cityInput.current?.value || "",
        postalCode: postalcodeInput.current?.value || "",
      },
    };
    const isCreated = await CreateCashOrder(id?.toString() || "", obj);
    if (isCreated) {
      toast.success("Order Created Successfully", {
        position: "top-right",
        richColors: true,
      });
      updateNumberOfCartItems(0);
      router.push("/");
    } else {
      toast.error("Error", { position: "top-right", richColors: true });
    }
  }
  async function handleCheckOutSessionOrder() {
    const obj: OrderPlaceType = {
      shippingAddress: {
        details: detailsInput.current?.value || "",
        phone: phoneInput.current?.value || "",
        city: cityInput.current?.value || "",
        postalCode: postalcodeInput.current?.value || "",
      },
    };
    const link = await CreateOnlineOrderAction(id?.toString() || "", obj);
    if (link === false) {
      toast.error("Failed", { position: "top-right", richColors: true });
    } else {
      window.open(link, "_self");
    }
  }
  return (
    <div className="w-3/4 mx-auto ">
      <Label>Details</Label>
      <Input ref={detailsInput} />
      <Label>Phone</Label>
      <Input ref={phoneInput} />
      <Label>City</Label>
      <Input ref={cityInput} />
      <Label>Postal Code</Label>
      <Input ref={postalcodeInput} />
      <Button
        className="bg-emerald-600 hover:bg-emerald-500"
        onClick={handleCashOrder}
      >
        Create Cash Order
      </Button>
      <Button
        className="bg-emerald-600 hover:bg-emerald-500"
        onClick={handleCheckOutSessionOrder}
      >
        Create Online Order
      </Button>
    </div>
  );
}
