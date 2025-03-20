import React, { forwardRef } from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    children: React.ReactNode;
}

function Button(props: ButtonProps, ref: React.Ref<HTMLButtonElement>) {
  return (
    <button {...props} ref={ref} className={`bg-blue-500 text-white px-4 py-2 rounded ${props.className}`}>
      {props.children}
    </button>
  )
}
export default forwardRef(Button);
