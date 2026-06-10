import { getUserCart } from "@/api/services/Route.services";
import React from "react";
import Image from "next/image";
import { CartResponse } from "@/api/types";
import RemoveProductButton from "./RemoveProductButton";
import UpdateProductCountButton from "./UpdateProductCountButton";
import ClearCartButton from "./ClearCartButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { clsx } from "clsx";
import { ArrowLeft } from "lucide-react";
export default async function Cart() {
  const userCart = await getUserCart();
  if (!userCart) {
    return;
  }
  const { totalCartPrice, products, _id } = userCart as CartResponse;
  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Page Title */}
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Shopping Cart</h1>

        <div className="lg:grid lg:grid-cols-12 lg:gap-6 flex flex-col gap-6">
          {/* ── Left: Cart Items ── */}
          <div className="lg:col-span-8">
            <div className="bg-white shadow sm:rounded-lg overflow-hidden border border-gray-200">
              {/* Items list */}
              <ul role="list" className="divide-y divide-gray-200">
                {products.map((item) => (
                  <li key={item._id} className="p-6 flex items-start gap-4">
                    {/* Product Image */}
                    <div className="w-24 h-24 flex-shrink-0 rounded-md overflow-hidden border border-gray-100">
                      <img
                        src={item.product.imageCover}
                        alt={item.product.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {item.product.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-0.5">
                        {item.product.brand?.name}
                      </p>
                      <p className="text-sm text-gray-400">
                        {item.product.category?.name}
                      </p>

                      {/* Qty Controls */}
                      <div className="flex items-center gap-3 mt-3">
                        <UpdateProductCountButton
                          id={item.product.id}
                          newCount={item.count - 1}
                        />
                        <span className="text-sm font-semibold text-gray-800 w-6 text-center">
                          {item.count}
                        </span>
                        <UpdateProductCountButton
                          id={item.product.id}
                          newCount={item.count + 1}
                          isIncrement
                        />
                      </div>
                    </div>

                    {/* Price + Remove */}
                    <div className="flex flex-col items-end gap-3">
                      <p className="text-sm font-semibold text-gray-900">
                        ${item.price}
                      </p>
                      <RemoveProductButton id={item.product.id} />
                    </div>
                  </li>
                ))}
              </ul>

              {/* Cart Footer Actions */}
              <div className="mt-6 flex items-center justify-between px-6 pb-6">
                <Link
                  href="/"
                  className="flex items-center gap-1 text-sm text-gray-600 hover:text-green-600 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Continue Shopping
                </Link>
                <ClearCartButton />
              </div>
            </div>
          </div>

          {/* ── Right: Order Summary ── */}
          <div className="lg:col-span-4">
            <div className="bg-white shadow sm:rounded-lg overflow-hidden border border-gray-200 p-6">
              {/* Summary Heading */}
              <h2 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-4 mb-4">
                Order Summary
              </h2>

              <dl className="mt-2 space-y-4">
                {/* Total Items */}
                <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                  <dt className="text-sm text-gray-600">Total Items</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    {products.length}
                  </dd>
                </div>

                {/* Total Price */}
                <div className="flex items-center justify-between pt-4">
                  <dt className="text-base font-bold text-gray-900">
                    Total Price
                  </dt>
                  <dd className="text-base font-bold text-indigo-600">
                    $ {totalCartPrice}
                  </dd>
                </div>
              </dl>

              {/* Checkout Button */}
              <div className="mt-6">
                <Link
                  href={`/cart/${_id}`}
                  className="w-full flex items-center justify-center rounded-lg bg-emerald-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-emerald-500 transition-colors"
                >
                  Checkout
                </Link>
                <p className="mt-3 text-center text-xs text-gray-500">
                  Taxes and shipping calculated at checkout
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
