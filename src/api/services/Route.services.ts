import { CartResponse, CategoryType, productType } from "../types";
import { decodeAuthenticatedUserToken } from "@/app/utlis";
import { getServerSession } from "next-auth";
import { nextAuthConfig } from "@/next-auth/nextAuth.config";

export async function getAllProducts(): Promise<productType[] | undefined> {
  try {
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/products");
    const finalRes = await res.json();
    console.log("finalRes", finalRes.data);
    return finalRes.data;
  } catch (error) {
    console.log("error", error);
    return undefined;
  }
}

export async function getSpecifiedProduct(
  id: string,
): Promise<productType | undefined> {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`,
    );
    const finalRes = await res.json();
    console.log("finalRes", finalRes.data);
    return finalRes.data;
  } catch (error) {
    console.log("error", error);
    return undefined;
  }
}

export async function getAllCategories(): Promise<CategoryType[] | undefined> {
  try {
    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/categories",
    );
    const finalRes = await res.json();
    console.log("finalRes", finalRes.data);
    return finalRes.data;
  } catch (error) {
    console.log("error", error);
    return undefined;
  }
}
export async function getUserCart(): Promise<CartResponse | undefined> {
  const userToken = await decodeAuthenticatedUserToken();
  if (userToken) {
    try {
      const res = await fetch(`https://ecommerce.routemisr.com/api/v2/cart`, {
        headers: { token: userToken },
      });
      const finalRes = await res.json();
      console.log("finalRes of cart", finalRes.data);
      return finalRes.data;
    } catch (error) {
      console.log("error", error);
    }
  } else {
    return undefined;
  }
}

// export async function getAllOrders() {
//   const session = await getServerSession(nextAuthConfig);
//   const userId = session?.user?.id;
//   try {
//     const res = await fetch(
//       `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,
//     );
//     const finalRes = await res.json();
//     console.log("finalRes of all orders", finalRes.data);
//     return finalRes;
//   } catch (error) {
//     console.log("error", error);
//   }
// }

export async function getAllBrands() {
  try {
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/brands");
    const finalRes = await res.json();
    console.log("finalRes", finalRes.data);
    return finalRes.data;
  } catch (error) {
    console.log("error", error);
    return undefined;
  }
}
