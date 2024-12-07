import React, { HTMLAttributes, ReactNode } from "react";
import NextPrev from "@/shared/NextPrev/NextPrev";

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  fontClass?: string;
  rightDescText?: ReactNode;
  rightPopoverOptions?: typeof solutions;
  desc?: ReactNode;
  hasNextPrev?: boolean;
  isCenter?: boolean;
}

const solutions = [
  {
    name: "last 24 hours",
    href: "##",
  },
  {
    name: "last 7 days",
    href: "##",
  },
  {
    name: "last 30 days",
    href: "##",
  },
];

const Heading: React.FC<HeadingProps> = ({
  children,
  desc = "",
  className = "mb-12 lg:mb-14 text-neutral-900 dark:text-neutral-50",
  isCenter = false,
  hasNextPrev = false,
  fontClass = "text-xl md:text-2xl font-semibold",
  rightDescText,
  rightPopoverOptions = solutions,
  ...args
}) => {
  return (
    <div
      className={`nc-Section-Heading relative flex   flex-row items-end justify-between ${className}`}
    >
      <div
        className={
          isCenter
            ? "flex flex-col items-center text-center w-full mx-auto"
            : ""
        }
      >
        <h2
          className={`${isCenter ? "justify-center" : ""} ${fontClass}`}
          {...args}
        >
          {children }
          {rightDescText && (
            <>
              <span className="">{`. `}</span>
              <span className="text-neutral-500 dark:text-neutral-400">
                {rightDescText}
              </span>
            </>
          )}
        </h2>
        {!!desc && (
          <span className="mt-3 md:mt-4 font-normal block text-base sm:text-xl text-neutral-500 dark:text-neutral-400">
            {desc}
          </span>
        )}
      </div>
      {hasNextPrev &&   (
        <div className={`mt-4 flex sm:ms-2 sm:mt-0 flex-shrink-0 ${isCenter?"justify-center w-full":"justify-end "}`}>
          <NextPrev onClickNext={() => {}} onClickPrev={() => {}} />
        </div>
      )}
    </div>
  );
};

export default Heading;
