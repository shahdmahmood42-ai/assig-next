import Link from "next/link";
import { getAllCategories } from "@/api/services/Route.services";
export default async function CategoriesSubPart() {
  const allCategories = await getAllCategories();
  return (
    <div className="p-5  flex flex-col gap-10 w-10/12 mx-auto">
      <div className="flex justify-between items-center my-2">
        <h2>Shop By Category</h2>
        <Link href="/category">View All Categories</Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
        {allCategories?.map((category) => (
          <div
            key={category._id}
            className="flex justify-center items-center flex-col rounded-lg hover:shadow-xl p-5 border-1"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-20 h-20 rounded-full m-auto"
            />
            <h3 className="text-center text-lg">{category.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
