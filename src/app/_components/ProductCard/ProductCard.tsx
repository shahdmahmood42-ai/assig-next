import { productType } from "@/api/types";
import { ProductCardProps } from "./Productcard.types";
import { FaEye, FaStar } from "react-icons/fa6";
import AddToCartButton from "../AddToCartButton/AddToCartButton";
import { CiHeart } from "react-icons/ci";
export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="border rounded-2xl p-2 relative">
      <div className="absolute top-4 right-1">
        <div className="bg-white shadow-2xl shadow-black border h-8 w-8 rounded-full flex items-center justify-center">
          <CiHeart />
        </div>
        <div className="mt-3 bg-white shadow-2xl shadow-black border h-8 w-8 rounded-full flex items-center justify-center">
          <FaEye />
        </div>
      </div>
      <img src={product.imageCover} alt={product.title} />
      <div className="text-gray-600 text-xs mt-3">{product.category.name}</div>
      <h2 className="font-bold text-xl">
        {product.title.split(" ", 2).join(" ")}
      </h2>
      <div className="flex gap-2 items-center">
        <FaStar className="text-yellow-400" />

        <p>
          {product.ratingsAverage}
          <span>{`(${product.ratingsQuantity})`}</span>
        </p>
      </div>
      <div className="flex justify-between mt-3">
        <h5 className="font-bold text-lg">
          {product.priceAfterDiscount ? (
            <>
              <span className="text-emerald-500 text-xl font-semibold">
                {product.priceAfterDiscount} EGP
              </span>
              <span className="text-red-500  ms-2 line-through text-xs">
                {product.price} EGP
              </span>
            </>
          ) : (
            <span className="text-xl font-semibold">{product.price} EGP</span>
          )}
        </h5>
        <AddToCartButton
          id={product.id}
          classNames="bg-[#16A34A] hover:bg-green-700 text-white text-2xl px-4 py-2 rounded-full h-10 w-10"
        >
          {" "}
          +
        </AddToCartButton>
      </div>
    </div>
  );
}
