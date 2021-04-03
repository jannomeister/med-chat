import React from "react";
import { splitFormProps, useField } from "react-form";

const Textarea = React.forwardRef((props, ref) => {
  const [field, fieldOptions, rest] = splitFormProps(props);

  const {
    meta: { error, isTouched, isValidating, message },
    getInputProps,
  } = useField(field, fieldOptions);

  return (
    <>
      <textarea rows={4} {...getInputProps({ ref, ...rest })} />

      {isValidating ? (
        <em>Validating...</em>
      ) : isTouched && error ? (
        <p className="text-center py-1 text-red-500 font-semibold rounded mb-2">
          {error}
        </p>
      ) : message ? (
        <small>{message}</small>
      ) : null}
    </>
  );
});

export default Textarea;
