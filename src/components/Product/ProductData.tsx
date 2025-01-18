import { FC, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import heartIcon from "@/assets/icons/heart.svg";
import { ProductType } from "@/lib/types";
import { client, urlFor } from "@/utils/Client";
import { v4 as uuidv4 } from "uuid";

interface ProductDataProps {
  productData?: ProductType;
  changeParam: (param: string, value: string | number) => void;
  selectedVariant: any;
  productColor: string | null;
  productVariant: string | null;
  productQuantity: number;
}

const ProductData: FC<ProductDataProps> = ({
  productData,
  changeParam,
  selectedVariant,
  productColor,
  productVariant,
  productQuantity,
}) => {
  const userInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo")!)
    : null;

  useEffect(() => {
    if (productData && !productColor) {
      changeParam("color", productData.colors[0]?.name);
    }
    if (productData && !productVariant) {
      changeParam("variant", productData.variants[0]?.title);
    }
  }, [productData, productColor, productVariant, changeParam]);

  const Variants = useMemo(
    () =>
      productData?.variants?.map((variant) => (
        <p
          className={`py-1 px-2 border rounded-lg text-sm lg:text-base cursor-pointer ${
            variant.title === productVariant
              ? "border-black"
              : "border-gray-300"
          } ${variant.stock === 0 ? "opacity-50 cursor-not-allowed" : "hover:border-black"} transition`}
          key={variant._key}
          onClick={() =>
            variant.stock > 0 && changeParam("variant", variant.title)
          }
          title={variant.stock === 0 ? "Out of stock" : ""}
        >
          {variant.title} {variant.stock === 0 ? "(Out of Stock)" : ""}
        </p>
      )),
    [productData?.variants, productVariant, changeParam]
  );

  const Colors = useMemo(
    () =>
      productData?.colors?.map((color, index) => {
        const img = productData.images.find(
          (image) => image.color === color.name
        )?.images[0]?.image.asset._ref;
        const isOutOfStock = !productData.variants.some(
          (variant) => variant.color === color.name && variant.stock > 0
        );
        if (!isOutOfStock) changeParam("color", color.name);

        return (
          <div key={index} className="flex flex-wrap gap-4 p-2">
            <img
              src={img && urlFor(img).toString()}
              alt={`${color.name} product`}
              width={64}
              height={64}
              className={`w-16 h-16 border ${color.name === productColor ? "border-black" : "border-transparent"} hover:p-[.1rem] duration-200 cursor-pointer ${
                isOutOfStock ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() => {
                if (!isOutOfStock) changeParam("color", color.name);
              }}
              title={isOutOfStock ? "Out of stock" : ""}
            />
          </div>
        );
      }),
    [productColor, changeParam, productData]
  );

  const Categories = productData?.categories?.map((item, index) => (
    <span key={item._key}>
      {item.title}
      {productData?.categories?.length > index + 1 && ","}{" "}
    </span>
  ));

  const alreadyWishlist = productData?.wishlist?.filter(
    (item) => item?.postedBy?._id == userInfo?._id
  )?.length;

  console.log(userInfo?._id);

  const saveWishlist = (id: string) => {
    if (!alreadyWishlist) {
      client
        .patch(id)
        .setIfMissing({ wishlist: [] })
        .insert("after", "wishlist[-1]", [
          {
            _key: uuidv4(),
            userId: userInfo?._id,
            postedBy: {
              _type: "postedBy",
              _ref: userInfo?._id,
            },
          },
        ])
        .commit()
        .then((data) => {
          console.log(data);
          console.log("addedd wishlist");

          // window.location.reload();
        });
    }
  };

  return (
    <div className="singleProduct__top--texts flex-grow self-stretch flex flex-col gap-6">
      <h4 className="text-neutral-700">{productData?.title}</h4>
      <p className="text-neutral-400 text-sm lg:text-base inter">
        {productData?.description}
      </p>
      <div className="flex items-center gap-3">
        <h6>${selectedVariant?.price || productData?.salePrice} </h6>
        <span className="fs-20 line-through text-neutral-400">
          ${productData?.price}
        </span>
      </div>
      <hr />
      <div className="additionalInfo flex flex-wrap gap-2">{Variants}</div>
      <div className="colors flex mt-2 gap-2 flex-wrap">
        <div>
          <p className="text-sm text-neutral-400">Choose Color {">"}</p>
          <p className="mt-2 capitalize">{productColor}</p>
          <div className="flex mt-4 gap-2">{Colors}</div>
        </div>
        <div>
          <p className="text-sm text-neutral-400">Product Stock {">"}</p>
          <p className="mt-2 capitalize">
            {selectedVariant?.stock || productData?.stock} available
          </p>
        </div>
      </div>
      <div className="user-collections flex flex-col gap-4 mt-4">
        <div className="flex items-center justify-between gap-6">
          <div className="counter flex items-center justify-center bg-neutral-200 rounded-lg">
            <Button
              onClick={() =>
                productQuantity > 1 &&
                changeParam("quantity", productQuantity - 1)
              }
              className="bg-transparent shadow-none text-black group"
            >
              <span className="group-hover:text-white">-</span>
            </Button>
            <span className="px-3">{productQuantity}</span>
            <Button
              onClick={() =>
                productQuantity < +selectedVariant?.stock! &&
                changeParam("quantity", productQuantity + 1)
              }
              className="bg-transparent shadow-none text-black group"
            >
              <span className="group-hover:text-white">+</span>
            </Button>
          </div>
          <Button
            className="w-full hover:invert duration-200"
            variant={"outline"}
            onClick={() => saveWishlist(`${productData?._id!}`)}
          >
            <img src={heartIcon} alt="heart icon" width={18} height={18} />{" "}
            <span className="font-normal">Wishlist</span>
          </Button>
        </div>
        <Button className="w-full hover:bg-secondary-green duration-200">
          Add to Cart
        </Button>
      </div>
      <div className="border-t pt-6 mt-2 inter text-xs flex flex-col gap-2">
        <div className="flex">
          <p className="text-neutral-400 min-w-32">SKU</p>
          <p>{selectedVariant?.sku || productData?.sku}</p>
        </div>
        <div className="flex">
          <p className="text-neutral-400 min-w-32">CATEGORY</p>
          <p>{Categories}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductData;
