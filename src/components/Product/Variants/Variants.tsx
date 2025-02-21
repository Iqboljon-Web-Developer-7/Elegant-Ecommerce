import { FC } from "react";

const VariantsComponent: FC<{
    variants: any[];
    selectedVariant: string;
    changeParam: (key: string, value: any) => void;
  }> = ({ variants, selectedVariant, changeParam }) => {
    return (
      <>
        {variants.map((variant) => {
          const isActive = variant.title === selectedVariant;
          const isOutOfStock = variant.stock === 0;
          return (
            <p
              key={variant._key}
              className={`py-1 px-2 border rounded-lg text-sm lg:text-base cursor-pointer ${isActive ? "border-black" : "border-gray-300"
                } ${isOutOfStock ? "opacity-50 cursor-not-allowed" : "hover:border-black"} transition`}
              onClick={() => {
                if (!isOutOfStock) changeParam("variant", variant.title);
              }}
              title={isOutOfStock ? "Out of stock" : ""}
            >
              {variant.title} {isOutOfStock && "(Out of Stock)"}
            </p>
          );
        })}
      </>
    );
  };
  

  export default VariantsComponent