// User Interface
export interface UserType {
  name?: string;
  username?: string;
  email?: string;
  password?: string;
}

// Slide Type Interface
export interface SlideType {
  images: {
    asset: { _ref: string };
  };
  media: string;
}

// Collection Type Interface
export interface CollectionType {
  image: { asset: { _ref: string } };
  title: string;
  urlName: string;
  url: string;
}

// Image Type Interface for Nested Images
export interface ImageType {
  // image: {
  //   asset: { _ref: string };
  // };

  color: string,
  src: string
}
export interface ImageTypeArray {
  image: {
    asset: { _ref: string };
  }[];
}

// Product Image Interface
export interface ProductImage {
  color: string;
  images: ImageType[]; // Array of ImageType
}

// Product Type Interface
export interface ProductType {
  _id: number;
  title: string;
  description: string;
  sku: string;
  originalPrice?: number;
  isNew?: boolean;
  discount?: number;
  images: ProductImage[]; // Array of ProductImage
  _createdAt: string;
  colors: {
    Color: string;
    name: string;
  }[];
  categories: {
    _key: string;
    title: string;
  }[];
  variants: ProductVariantType[];
  wishlist: {
    userId: string;
    postedBy: {
      _id: string;
    };
  }[];
  metadata: {
    _id: string;
    brand: string;
    dimension: string;
    material: string;
    weight: string;
  };
  reviews: {
    rating: number,
    comment: string,
    _key: string,
    postedBy: {
      _ref:string
    }
  }[]
}

export interface ProductVariantType {
  color: string;
  price: number;
  salePrice: number;
  sku: string;
  stock: number;
  title: string;
  _key: string;
}

// Products Carousel Props Interface
export interface ProductsCarouselProps {
  products: ProductType[];
}

export interface ProductCarouselType {
  filteredImages: { src: string, color: string }[] 
  createdAt?: string;
  selectedVariant: ProductVariantType;
}

export interface ProductDataProps {
  productData?: ProductType;
  selectedVariant: ProductVariantType;
  selectedParamColor: string | null;
  selectedParamVariant: string | null;
  selectedParamQuantity: number;
}

// Styled link
export interface StyledLinkTypes {
  destination: string;
  name: string;
  className?: string;
}
