import { useEffect } from "react";
import { useFormikContext } from "formik";

interface ErrorScroller<T> {}

export const ErrorScroller = <T,>(_props: ErrorScroller<T>) => {
  const { submitCount, isValid, errors } = useFormikContext<T>();

  useEffect(() => {
    if (isValid) return;

    const fieldErrorNames = Object.keys(errors);
    if (fieldErrorNames.length <= 0) return;

    const errorField = fieldErrorNames[0];

    const element = document.querySelector(`#${errorField}`);
    if (!element) return;

    element.scrollIntoView({ behavior: "smooth", block: "center" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitCount]);

  return null;
};
