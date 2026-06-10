"use server";
import { revalidatePath } from "next/cache";
import { decodeAuthenticatedUserToken } from "../utlis";
import { OrderPlaceType } from "@/api/types";

export async function addProductToCart(id: string) {
  const bodyObj = { productId: id };
  const userToken = await decodeAuthenticatedUserToken();
  if (userToken) {
    try {
      const res = await fetch(`https://ecommerce.routemisr.com/api/v2/cart`, {
        method: "post",
        headers: { token: userToken, "content-type": "application/json" },
        body: JSON.stringify(bodyObj),
      });
      if (res.ok) {
        const finalRes = await res.json();
        console.log("finalRes to add", finalRes);
        revalidatePath("/cart");
        return finalRes.numOfCartItems;
      } else {
        return false;
      }
    } catch (error) {
      console.log("error", error);
    }
  } else {
    return new Error("session ended please login again");
  }
}

export async function deleteElementFromCart(productId: string) {
  const token = await decodeAuthenticatedUserToken();
  if (token) {
    try {
      const res = await fetch(
        `https://ecommerce.routemisr.com/api/v2/cart/${productId}`,
        {
          method: "delete",
          headers: { token },
        },
      );
      if (res.ok) {
        const finalRes = await res.json();
        console.log("finalRes to delete", finalRes);
        revalidatePath("/cart");
        return finalRes.numOfCartItems;
      } else {
        return null;
      }
    } catch (error) {
      console.log("error", error);
    }
  } else {
    return new Error("session ended");
  }
}

export async function updateProductCount(productId: string, newCount: number) {
  const token = await decodeAuthenticatedUserToken();
  if (token) {
    try {
      const res = await fetch(
        `https://ecommerce.routemisr.com/api/v2/cart/${productId}`,
        {
          method: "put",
          headers: { token, "content-type": "application/json" },
          body: JSON.stringify({ count: newCount }),
        },
      );
      if (res.ok) {
        const finalRes = await res.json();
        console.log("finalRes to delete", finalRes);
        revalidatePath("/cart");
        return finalRes.numOfCartItems;
      } else {
        return null;
      }
    } catch (error) {
      console.log("error", error);
    }
  } else {
    return new Error("session ended");
  }
}

export async function ClearAllCart() {
  const token = await decodeAuthenticatedUserToken();
  if (token) {
    try {
      const res = await fetch(`https://ecommerce.routemisr.com/api/v2/cart`, {
        method: "delete",
        headers: { token },
      });
      if (res.ok) {
        const finalRes = await res.json();
        console.log("finalRes to clear", finalRes);
        revalidatePath("/cart");
        return finalRes.numOfCartItems;
      } else {
        return null;
      }
    } catch (error) {
      console.log("error", error);
    }
  } else {
    return new Error("session ended");
  }
}

export async function CreateCashOrder(
  cartId: string,
  bodyObject: OrderPlaceType,
) {
  const token = await decodeAuthenticatedUserToken();
  if (token) {
    try {
      const res = await fetch(
        `https://ecommerce.routemisr.com/api/v2/orders/${cartId}`,
        {
          method: "post",
          headers: { token, "content-type": "application/json" },
          body: JSON.stringify(bodyObject),
        },
      );
      if (res.ok) {
        const finalRes = await res.json();
        console.log("finalRes from creating Cash order", finalRes);

        // revalidatePath("/cart");
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log("error", error);
    }
  } else {
    return new Error("session ended");
  }
}

export async function CreateOnlineOrderAction(
  cartId: string,
  bodyObject: OrderPlaceType,
) {
  const token = await decodeAuthenticatedUserToken();
  if (token) {
    try {
      const res = await fetch(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
        {
          method: "post",
          headers: { token, "content-type": "application/json" },
          body: JSON.stringify(bodyObject),
        },
      );
      if (res.ok) {
        const finalRes = await res.json();
        console.log("finalRes from creating Online order", finalRes);

        // revalidatePath("/cart");
        return finalRes.session.url;
      } else {
        return false;
      }
    } catch (error) {
      console.log("error", error);
    }
  } else {
    return new Error("session ended");
  }
}
