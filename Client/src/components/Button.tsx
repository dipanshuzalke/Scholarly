import { ReactElement } from "react";

interface ButtonProps {
  variant: "primary" | "secondary";
  size: "sm" | "md" | "lg";
  text: string;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  onClick?: () => void;
  fullWidth?: boolean;
  loading?: boolean;
}

const variantStyles = {
  primary: "bg-[#4F77FF] text-white hover:bg-[#3A5FE0]", // Bright blue with hover
  secondary: "bg-[#A7C3E1] text-[#000046] hover:bg-[#91B5DA]", // Soft blue, readable on dark
};

const sizeStyles = {
  sm: "px-2 py-1 text-sm",
  md: "px-4 py-2 text-md",
  lg: "px-6 py-3 text-lg",
};

const defaultStyles =
  "flex items-center rounded-md font-normal text-sm transition-all duration-200 px-2 py-2 md:px-4 md:py-2 bg-[#1034A6] text-white hover:bg-[#264bb5] active:bg-[#082b83] shadow-sm hover:shadow-md";

// The Button functional component
export function Button({
  variant,
  text,
  startIcon,
  onClick,
  fullWidth,
  loading,
}: ButtonProps) {
  return (
    // A button element with dynamic class names and properties
    <button
      onClick={onClick}
      className={
        variantStyles[variant] +
        " " +
        defaultStyles +
        `${fullWidth ? " w-full flex justify-center items-center" : ""} ${
          loading ? "opacity-45" : ""
        }`
      }
      disabled={loading}
    >
      {/* Container for optional start icon */}
      <div className="pr-2">{startIcon}</div>
      {/* Button text */}
      {text}
    </button>
  );
}
