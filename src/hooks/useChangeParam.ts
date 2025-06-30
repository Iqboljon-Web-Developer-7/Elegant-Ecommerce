import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

const useChangeParam = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const changeParam = useCallback(
    (param: string, value: string | number, replace = false) => {
      const newParams = new URLSearchParams(searchParams.toString()); 
      newParams.set(param, value.toString());
      setSearchParams(newParams, {replace:replace}); 
    },
    [searchParams, setSearchParams]
  );

  return { changeParam };
};

export default useChangeParam;
