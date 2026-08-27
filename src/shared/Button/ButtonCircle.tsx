import React, { ButtonHTMLAttributes } from "react";
import twFocusClass from "@/utils/twFocusClass";

export interface ButtonCircleProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: string;
}

const ButtonCircle: React.FC<ButtonCircleProps> = ({
  className = " ",
  size = " w-9 h-9 ",
  ...args
}) => {
  return (
    <button
      className={
        `ttnc-ButtonCircle flex items-center justify-center rounded-full leading-none!  disabled:bg-slate-900/70 hover:bg-slate-800 
        text-slate-50 ${className} ${size} ` + twFocusClass(true)
      }
      {...args}
    />
  );
};

export default ButtonCircle;
