import ProductCard from "./_components/ProductCard/ProductCard";
import { getAllProducts } from "@/api/services/Route.services";
import Link from "next/link";
import MySwiper from "./_components/MySwiper/MySwiper";
import image1 from "@images/slide3.png";
import image2 from "@images/slide1.png";
import image3 from "@images/slide2.jpg";
import { lazy, Suspense } from "react";
import { BeatLoader } from "react-spinners";
export default async function HomePage() {
  const allProducts = await getAllProducts();
  const CategoriesSubPartAsLazyLoadedComp = lazy(
    () => import("./_components/CategoriesSubPart/CategoriesSubPart"),
  );
  // async function getAllUsers() {
  //   const res = await fetch(`http://localhost:3000/api/users`);
  //   const finalRes = await res.json();
  //   console.log("finalRes", finalRes);
  // }
  // getAllUsers();
  return (
    <div>
      <MySwiper imagesList={[image1.src, image2.src, image3.src]} />
      <Suspense
        fallback={
          <div className="w-full h-30 bg-gray-300 text-2xl text-center flex justify-center items-center">
            <BeatLoader />
          </div>
        }
      >
        <CategoriesSubPartAsLazyLoadedComp />
      </Suspense>
      <div>
        <h2 className="text-3xl mx-10  w-10/12 font-semibold my-2">
          Featured Products
        </h2>
        <div className="grid md:grid-cols-4 lg:grid-cols-5 md:gap-8 md:p-10">
          {allProducts?.map((product) => (
            <Link href={`/products/${product.id}`} key={product.id}>
              <ProductCard product={product} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
