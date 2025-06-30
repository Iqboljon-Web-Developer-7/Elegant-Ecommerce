import { urlFor } from "@/utils/Client";
import { FC } from "react";

const ColorsComponent: FC<{
  colors: any[];
  variants: any[];
  selectedVariant: string;
  selectedParamColor: string;
  changeParam: (key: string, value: any, replace: boolean) => void;
  images: any[];
}> = ({
  colors,
  variants,
  selectedVariant,
  selectedParamColor,
  changeParam,
  images,
}) => {
    const availableVariant = variants
      .filter((variant) => variant.title === selectedVariant)
      .map((variant) => ({ title: variant.title, stock: variant.stock, color: variant.color }))[0]

    return (
      <>
        {colors.map((color, index) => {
          const imageRef = images.find((img) => img.color === colors[index]?.name)
            ?.images[0]?.src

          const isAvailable = availableVariant?.color == colors[index]?.name
          if (isAvailable) {
            setTimeout(() => {
              changeParam("color", colors[index]?.name, true);
            }, 0);
          }

          return (
            <div key={index} className="flex flex-wrap gap-4 p-2">
              <img
                src={imageRef ? urlFor(imageRef).width(100).height(100).toString() : ""}
                alt={`${colors[index]?.name} product`}
                width={64}
                height={64}
                className={`w-16 h-16 border ${colors[index]?.name === selectedParamColor
                  ? "border-black"
                  : "border-transparent"
                  } hover:p-[.1rem] duration-200 cursor-pointer ${!isAvailable ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                title={
                  !isAvailable ? "Not available for the selected variant" : ""
                }
                onClick={() => {
                  let availableVariant = variants.filter((variant) => variant.color === colors[index].name && variant.stock > 0)[0]?.title
                  if(availableVariant){

                    changeParam("variant", availableVariant, true);
                  }
                }}
              />
            </div>
          );
        })}
      </>
    );
  };

export default ColorsComponent;
