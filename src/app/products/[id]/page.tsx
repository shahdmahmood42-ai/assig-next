import { getSpecifiedProduct } from "@/api/services/Route.services";
import { FaStar } from "react-icons/fa";
import AddToCartButton from "./../../_components/AddToCartButton/AddToCartButton";
import { Button } from "@/components/ui/button";
export default async function productDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const productDetails = await getSpecifiedProduct(id);
  return (
    <div className="h-screen bg-gray-100 p-3 grid grid-cols-4 items-center gap-4 w-10/12 mx-auto">
      <div className="col-span-1 me-2">
        <img
          className="w-full "
          src={productDetails?.imageCover}
          alt={productDetails?.title}
        />
        <div className="flex gap-2">
          {productDetails?.images.map((img) => (
            <img className="w-1/4" src={img} alt={productDetails?.title} />
          ))}
        </div>
      </div>
      <div className="col-span-3  ">
        <div>
          <span className="text-xs text-white bg-emerald-500 rounded-2xl p-3 mx-3">
            {productDetails?.category.name}
          </span>
          <span className="text-xs text-white bg-emerald-500 rounded-2xl p-3 mx-3">
            {productDetails?.brand.name}
          </span>
        </div>
        <h1 className="font-semibold text-2xl my-3">{productDetails?.title}</h1>
        <div className="flex gap-2 items-center">
          <FaStar className="text-yellow-500" />
          {productDetails?.ratingsAverage}
        </div>
        <h3 className="text-gray-700">{productDetails?.description}</h3>
        <h3>{productDetails?.category.name}</h3>
        <h3>{productDetails?.brand.name}</h3>
        <h5 className="font-bold text-lg">
          {productDetails?.priceAfterDiscount ? (
            <>
              <span className="text-red-500  me-2 line-through">
                {productDetails?.price}
              </span>
              <span>{productDetails?.priceAfterDiscount} LE</span>
            </>
          ) : (
            <span>{productDetails?.price} LE</span>
          )}
        </h5>
        <div className="flex gap-1 items-center">
          <FaStar className="text-yellow-400" />

          <p>
            {productDetails?.ratingsAverage}
            <span>{`(${productDetails?.ratingsQuantity})`}</span>
          </p>
        </div>
        <div className="flex gap-4 p-2">
          <AddToCartButton
            id={productDetails!.id}
            classNames="w-1/2 bg-emerald-500 text-2xl py-5 cursor-pointer"
          >
            <h6>Add To Cart</h6>
          </AddToCartButton>
          <Button className="w-1/2 bg-sky-500 text-2xl py-5 cursor-pointer">
            Add To WishList
          </Button>
        </div>
      </div>
    </div>
  );
}
