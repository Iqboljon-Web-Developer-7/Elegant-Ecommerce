import { FC } from "react";

const VariantsComponent: FC<{
  variants: any[];
  selectedVariant: string;
  selectedParamColor: string;
  changeParam: (key: string, value: any, replace: boolean) => void;
}> = ({ variants, selectedVariant,selectedParamColor, changeParam }) => {

  const availableVariants = variants
    .filter((variant) => variant.color == selectedParamColor)
    .map((variant) => variant.title);
  return (
    <>
      {variants.map((variant) => {
        const isActive = variant.title === selectedVariant;
        const isOutOfStock = variant.stock === 0;
        const isAvailable = availableVariants.includes(variant.title);

        return (
          <p
            key={variant._key}
            className={`py-1 px-2 border rounded-lg text-sm lg:text-base cursor-pointer ${isActive ? "border-black" : "border-gray-300"
              } ${isOutOfStock || !isAvailable ? "opacity-50 cursor-not-allowed" : "hover:border-black"} transition`}
            onClick={() => {
              if (!isOutOfStock) changeParam("variant", variant.title, true);
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