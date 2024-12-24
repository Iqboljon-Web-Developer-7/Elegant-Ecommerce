export interface slideType {
  images: {
    asset: { _ref: string };
  };
}
export interface collectionType {
  image: { asset: { _ref: string } };
  title: string;
  urlName: string;
  url: string;
}

export interface ProductImage {
  image: {
    asset: {
      _ref: string;
    } | null;
  };
}

export interface Product {
  _id: number;
  title: string;
  price: number;
  originalPrice?: number;
  isNew?: boolean;
  discount?: number;
  images: ProductImage[];
  _createdAt: string;
  salePrice: number;
}

export interface ProductsCarouselProps {
  products: Product[];
}
