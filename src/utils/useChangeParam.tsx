// import { useCallback } from "react";
// import { useSearchParams } from "react-router-dom"

// export const useChangeParam = () => {
//   const [searchParams, setSearchParams] = useSearchParams()

//   return useCallback((param: string, value: string | number) => {
//     const updatedParams = new URLSearchParams(searchParams);
//     updatedParams.set(param, value?.toString());
//     setSearchParams(updatedParams, { replace: true });
//   }, [searchParams, setSearchParams]);
// }