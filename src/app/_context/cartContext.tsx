"use client";
import { CartResponse } from "@/api/types";
import React, { createContext, ReactNode, useContext, useState } from "react";
export interface cartContextType {
  numberOfCartItems: number;
  updateNumberOfCartItems: (num: number) => void;
}
export const cartContext = createContext<cartContextType>({
  numberOfCartItems: 0,
  updateNumberOfCartItems() {},
});
export default function CartContextProvider({
  children,
  res,
}: {
  children: ReactNode;
  res: CartResponse | undefined;
}) {
  const [numberOfCartItems, setNumberOfCartItems] = useState(() => {
    return res === undefined ? 0 : (res as CartResponse).products.length;
  });
  function updateNumberOfCartItems(num: number) {
    setNumberOfCartItems(num);
  }

  return (
    <cartContext.Provider
      value={{ numberOfCartItems, updateNumberOfCartItems }}
    >
      {children}
    </cartContext.Provider>
  );
}

export function useCart() {
  const res = useContext(cartContext);
  if (!res) {
    return new Error("Cannot use Cart context outside it's context ");
  }
  return res;
}
