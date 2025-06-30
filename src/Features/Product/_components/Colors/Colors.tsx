import { urlFor } from "@/utils/Client";
import { FC } from "react";

const ColorsComponent: FC<{
  colors: any[];
  variants: any[];
  productVariant: string;
  productColor: string;
  changeParam: (key: string, value: any, replace: boolean) => void;
  images: any[];
}> = ({
  colors,
  variants,
  productVariant,
  productColor,
  changeParam,
  images,
}) => {
  const availableColors = variants
    .filter((variant) => variant.title === productVariant)
    .map((variant) => variant.color);

  return (
    <>
      {colors.map((color, index) => {
        const imageRef = images.find((img) => img.color === color.name)
          ?.images[0]?.src
        const isAvailable = availableColors.includes(color.name);
        if (isAvailable) {
          setTimeout(() => {
            changeParam("color", color.name, true);
          }, 0);
        }

        return (
          <div key={index} className="flex flex-wrap gap-4 p-2">
            <img
              src={imageRef ? urlFor(imageRef).width(100).height(100).toString() : ""}
              alt={`${color.name} product`}
              width={64}
              height={64}
              className={`w-16 h-16 border ${
                color.name === productColor
                  ? "border-black"
                  : "border-transparent"
              } hover:p-[.1rem] duration-200 cursor-pointer ${
                !isAvailable ? "opacity-50 cursor-not-allowed" : ""
              }`}
              title={
                !isAvailable ? "Not available for the selected variant" : ""
              }
              onClick={() => {
                if (isAvailable) changeParam("color", color.name, true);
              }}
            />
          </div>
        );
      })}
    </>
  );
};

export default ColorsComponent;
