import { useNavigate, useLocation } from "react-router-dom";
import { useCallback } from "react";

const useUpdateQueryParam = () => {
  const navigate = useNavigate();
  const { search } = useLocation();

  return useCallback((updates: Record<string, string | number>) => {
    // Create a URLSearchParams object from the existing search string
    const params = new URLSearchParams(search);
    
    // Set or update the keys in a specific order
    // Define the desired order here:
    const order = ["variant", "color", "quantity"];
    
    // Merge the current params with the updates
    Object.keys(updates).forEach((key) => {
      params.set(key, updates[key].toString());
    });

    // Create a new ordered object
    const orderedParams = new URLSearchParams();
    order.forEach((key) => {
      if (params.has(key)) {
        orderedParams.set(key, params.get(key)!);
      }
    });
    // Add any other keys that might not be in the order array
    for (const [key, value] of params.entries()) {
      if (!orderedParams.has(key)) {
        orderedParams.set(key, value);
      }
    }

    // Replace the current history entry with the new URL
    navigate({ search: orderedParams.toString() }, { replace: true });
  }, [navigate, search]);
};

export default useUpdateQueryParam;
