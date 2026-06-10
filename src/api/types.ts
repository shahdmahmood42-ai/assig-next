export interface productType {
  id: string;
  title: string;
  description: string;
  images: string[];
  quantity: number;
  price: number;
  priceAfterDiscount?: number;
  ratingsAverage: number;
  ratingsQuantity: number;
  imageCover: string;
  category: CategoryType;
  brand: BrandType;
}
export interface CategoryType {
  _id: string;
  name: string;
  slug: string;
  image: string;
}
export interface BrandType {
  _id: string;
  name: string;
  slug: string;
  image: string;
}
export interface CartResponse {
  _id: string;
  cartOwner: string;
  totalCartPrice: string;
  products: itemType[];
}

export interface itemType {
  _id: string;
  count: number;
  price: number;
  product: productType;
}
export interface OrderPlaceType {
  shippingAddress: {
    details: string;
    phone: string;
    city: string;
    postalCode: string;
  };
}
