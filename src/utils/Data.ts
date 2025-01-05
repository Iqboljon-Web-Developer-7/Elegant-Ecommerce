import { UserType } from "@/lib/types";

export const SANITY_LOGIN_USER = (user: UserType) => {
  return `*[_type == "user" && username == '${user?.name}' || email == '${user?.name}' && password == '${user?.password}']`;
};

export const SANITY_REGISTER_USER = (user: UserType) => {
  return `*[_type == "user" && username == '${user.username}']`;
};

export const SANITY_SLIDES_QUERY = `*[_type == "carousel"]`;

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

  return `*[_type == "product"] | order(_id) [${start}...${end}]`;
};

export const SANITY_PRODUCT_QUERY = (id: string) => {
  return `*[_type == "product" && _id == '${id}']`;
};

export const SANITY_INSTAFEED_QUERY = `*[_type == "InstaFeed"]`;
