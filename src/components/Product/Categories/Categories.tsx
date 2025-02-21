import { FC } from "react";

const CategoriesComponent: FC<{ categories: any[] }> = ({ categories }) => {
  return (
    <>
      {categories.map((item, index) => (
        <span key={item._key}>
          {item.title}
          {categories.length > index + 1 && ", "}
        </span>
      ))}
    </>
  );
};

export default CategoriesComponent