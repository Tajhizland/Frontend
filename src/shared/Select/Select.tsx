import React, {SelectHTMLAttributes} from "react";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    className?: string;
    sizeClass?: string;
}

// eslint-disable-next-line react/display-name
const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
    ({className = "", sizeClass = "h-11", children, ...args}, ref) => {
        return (
            <select
                ref={ref}
                className={`nc-Select ${sizeClass} ${className} block w-full text-sm rounded-2xl border-neutral-200 focus:border-primary-300 focus:ring-3 focus:ring-primary-200/50 bg-white text-neutral-900 scheme-light dark:border-neutral-700 dark:focus:ring-primary-6000/25 dark:bg-neutral-900 dark:text-neutral-100 dark:scheme-dark [&_option]:bg-white [&_option]:text-neutral-900 dark:[&_option]:bg-neutral-900 dark:[&_option]:text-neutral-100 disabled:bg-neutral-100 disabled:text-neutral-500 dark:disabled:bg-neutral-800 dark:disabled:text-neutral-400`}
                {...args}
            >
                {children}
            </select>
        );
    }
);

export default Select;
