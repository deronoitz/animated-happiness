import { memo } from "react";

import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

interface BaseFieldProps {
  as?: "input" | "textarea"; // Allows specifying input type
}

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  as?: "input";
}

interface TextareaFieldProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  as: "textarea";
}

type FieldProps = BaseFieldProps & (InputFieldProps | TextareaFieldProps);

function Field(props: FieldProps) {
  const { as } = props;
  const classNames =
    "shadow-input-box outline-0 px-4 py-3 placeholder:text-xs text-base placeholder:text-slate-300 bg-white w-full rounded-xl border border-white";

  return (
    <>
      {as !== "textarea" && (
        <input
          className={classNames}
          {...(props as InputHTMLAttributes<HTMLInputElement>)}
        />
      )}

      {as === "textarea" && (
        <textarea
          className={classNames}
          {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      )}
    </>
  );
}

export default memo(Field);
