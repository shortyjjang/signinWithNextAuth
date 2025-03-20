import React, { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  regex?: RegExp;
  regexMessage?: string;
  type?: string;
}

function Input(
  {
    value = "",
    regex,
    regexMessage = "올바른 형식을 입력해주세요.",
    type = "text",
    ...props
  }: InputProps,
  ref: React.Ref<HTMLInputElement>
) {
  return (
    <div className="flex flex-col gap-0.5">
      <input
        type={type}
        ref={ref}
        value={value}
        {...props}
        className="border p-2 w-full"
      />
      {value && regex && !vertify(value, regex) && (
        <p className="text-red-500 text-sm pb-1">{regexMessage}</p>
      )}
    </div>
  );
}

export default forwardRef(Input);

const vertify = (value: string, regex: RegExp) => {
  if (value.length > 0) {
    return regex.test(value);
  }
  return false;
};
