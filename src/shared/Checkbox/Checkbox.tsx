import React, { FC } from "react";

export interface CheckboxProps {
  label?: string;
  subLabel?: string;
  className?: string;
  sizeClassName?: string;
  labelClassName?: string;
  name: string;
  defaultChecked?: boolean;
  /** حالت کنترل‌شده؛ وقتی داده شود تیک همیشه با state والد هماهنگ می‌ماند. */
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

const Checkbox: FC<CheckboxProps> = ({
  subLabel = "",
  label = "",
  name,
  className = "",
  sizeClassName = "w-6 h-6",
  labelClassName = "",
  defaultChecked,
  checked,
  onChange,
}) => {
  return (
    <div className={`flex text-sm sm:text-base ${className}`}>
      <input
        id={name}
        name={name}
        type="checkbox"
        className={`focus:ring-action-primary text-primary-500 rounded-sm border-slate-400 hover:border-slate-700 bg-transparent dark:border-slate-700 dark:hover:border-slate-500 dark:checked:bg-primary-500 focus:ring-primary-500 ${sizeClassName}`}
        {...(checked !== undefined ? { checked } : { defaultChecked })}
        onChange={(e) => onChange && onChange(e.target.checked)}
      />
      {label && (
        <label
          htmlFor={name}
          className="pr-2.5 sm:pr-3.5 flex flex-col flex-1 justify-center select-none"
        >
          <span
            className={`text-slate-900 dark:text-slate-100 ${labelClassName} ${
              !!subLabel ? "-mt-0.5" : ""
            }`}
          >
            {label}
          </span>
          {subLabel && (
            <p className="mt-0.5 text-slate-500 dark:text-slate-400 text-sm font-light">
              {subLabel}
            </p>
          )}
        </label>
      )}
    </div>
  );
};

export default Checkbox;
