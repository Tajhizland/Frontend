import React from "react";

export interface AlertProps {
  containerClassName?: string;
  type?: "default" | "warning" | "info" | "success" | "error";
  children?: React.ReactNode;
}

export const Alert: React.FC<AlertProps> = ({
  children = "Alert Text",
  containerClassName = "",
  type = "default",
}) => {
  let classes = containerClassName;
  switch (type) {
    case "default":
      classes += " text-black bg-blue-100";
      break;
    case "info":
      // classes += " bg-status-infoBg text-status-info";
      classes += " text-indigo-800 bg-indigo-100";
      break;
    case "success":
      // classes += " bg-status-successBg text-status-success";
      classes += " text-green-800 bg-green-100";
      break;
    case "error":
      // classes += " bg-status-errorBg text-status-error";
      classes += " text-red-800 bg-red-100";
      break;
    case "warning":
      // classes += " bg-status-warningBg text-status-warning";
      classes += " text-yellow-800 bg-yellow-100";
      break;
    default:
      break;
  }

  return (
    <div
      className={`ttnc-alert relative flex items-center text-paragraph-base px-2 py-3 rounded-lg ${classes}`}
    >
      <i className="pe-7s-info text-2xl mr-2"></i>
        {children}
    </div>
  );
};
