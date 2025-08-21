import React from "react";

type ButtonVariant = "default" | "text" | "link" | "outlined";
type ButtonShape = "default" | "rounded" | "square";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  shape?: ButtonShape;
}

export const Button: React.FC<ButtonProps> = ({
  className = "",
  children,
  variant = "default",
  shape = "default",
  ...props
}) => {
  let variantStyles = "";

  switch (variant) {
    case "default":
      variantStyles =
        "border border-black text-black bg-transparent " +
        "hover:bg-[#2969CA] hover:text-white hover:border-[#2969CA] " +
        "active:bg-[#15458D] active:border-[#15458D] active:text-white";
      break;

    case "outlined":
      variantStyles =
        "border border-black text-black bg-transparent " +
        "hover:border-[#2969CA] hover:bg-[#2969CA] hover:text-[#FFF] " +
        "active:border-[#15458D] active:text-[#FFF] active:bg-[#15458D]";
      break;

    case "text":
      variantStyles =
        "bg-transparent border-0 text-black " +
        "hover:text-[#2969CA] active:text-[#15458D]";
      break;

    case "link":
      variantStyles =
        "bg-transparent border-0 text-[#2969CA] underline underline-offset-4 " +
        "hover:text-[#15458D]";
      break;
  }

  const shapeStyles =
    shape === "rounded"
      ? "rounded-full"
      : shape === "square"
        ? "rounded-none"
        : "rounded-md";

  const baseStyles =
    "inline-flex items-center justify-center text-[16px] font-medium " +
    "px-[50px] py-[20px] transition-colors duration-200 " +
    "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2969CA] " +
    "disabled:opacity-50 disabled:pointer-events-none outline-none";

  return (
    <button
      className={`${baseStyles} ${shapeStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};