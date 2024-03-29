import { ForwardedRef, useEffect, useRef } from "react";

const useForwardRef = <T = unknown,>(ref: ForwardedRef<T>, initialValue: T | null = null) => {
  const targetRef = useRef<T>(initialValue);

  useEffect(() => {
    if (!ref) return;

    if (typeof ref === "function") {
      ref(targetRef.current);
    } else {
      // eslint-disable-next-line no-param-reassign
      ref.current = targetRef.current;
    }
  }, [ref]);

  return targetRef;
};

export default useForwardRef;
