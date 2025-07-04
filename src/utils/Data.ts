import { UserType } from "@/lib/types";

export const SANITY_LOGIN_USER = (user: UserType) => {
  return `*[_type == "user" && ((username == '${user?.name}' || email == '${user?.email}') && password == '${user?.password}')][0]
`;
};

export const SANITY_REGISTER_USER = (user: UserType) => {
  return `*[_type == "user" && username == '${user.username}']`;
};

export const SANITY_SLIDES_QUERY = (media: string) => {
  return `*[_type == "carousel" && media == '${media}']`
}

export const SANITY_COLLECTIONS_QUERY = `*[_type == "collection"] | order(_createdAt)`;

export const SANITY_PRODUCTS_QUERY = (start = 0, end = 20) => {
  if (typeof start !== "number" || !Number.isInteger(start) || start < 0) {
    throw new Error(
      'Invalid "start" value. It must be a non-negative integer.'
    );
  }

  if (typeof end !== "number" || !Number.isInteger(end) || end < 0) {
    throw new Error('Invalid "end" value. It must be a non-negative integer.');
  }
  if (start > end) {
    throw new Error('"start" cannot be greater than "end".');
  }

  return `*[_type == "product"] | order(_id) [${start}...${end}] {
    _id,
    variants,
    title,
    images[]{
      color,
      images[]{
        _key,
        "src": image.asset._ref
      }
    },
    _createdAt,
    description,
    colors
  }`;
};

export const SANITY_PRODUCT_QUERY = (id: string) => {
  return `*[_type == "product" && _id == '${id}'][0]{
   variants, 
   title,
   images[]{
    color,
    images[]{
      _key,
      "src": image.asset._ref
    }
   },
   _createdAt,
   description,
   colors,
   categories,
   reviews
   }
`;
};
export const SANITY_PRODUCT_REVIEWS = (productId: string, start: number, end: number) => {
  return `*[_type == "review" && product._ref == '${productId}'] | order(_createdAt desc) [${start}...${end}] {
            rating, comment, postedBy->{name}
          }
        `}

export const SANITY_INSTAFEED_QUERY = `*[_type == "InstaFeed"]`;

export const SANITY_USER_WISHLIST = (userId: string) =>
  `*[_type == "wishlist" && userId == '${userId}'][0]`;

export const SANITY_IS_PRODUCT_IN_WISHLIST = (
  userId: string,
  productId: number
) => `
  *[_type == "wishlist" && userId == '${userId}' && "${productId}" in items[].product._ref][0] {
    _id
  }
`;
