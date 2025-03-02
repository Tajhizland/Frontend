import Button, { ButtonProps } from "@/shared/Button/Button";
import React, {ButtonHTMLAttributes} from "react";

export interface ButtonPrimaryProps extends ButtonHTMLAttributes<any> {}

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({
  className = "",
  ...args
}) => {
  return (
    <Button
      className={`ttnc-ButtonPrimary disabled:bg-opacity-60 disabled:cursor-not-allowed bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 text-slate-50 dark:text-slate-800 shadow-xl ${className}`}
      {...args}
    />
  );
};

export default ButtonPrimary;
