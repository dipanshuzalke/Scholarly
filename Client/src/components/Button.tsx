import { ReactElement } from 'react'

interface ButtonProps {
  variant: "primary" | "secondary"; 
  size: 'sm' | 'md' | 'lg'
  text: string
  startIcon?: ReactElement
  endIcon?: ReactElement
  onClick?: () => void,
  fullWidth?: boolean; 
    loading?: boolean; 
}

const variantStyles = {
  primary: 'bg-[#1034A6] text-white',
  secondary: 'bg-[#BCD2E8] text-[#1034A6]'
}

const sizeStyles = {
  sm: 'px-2 py-1 text-sm',
  md: 'px-4 py-2 text-md',
  lg: 'px-6 py-3 text-lg'
}

const defaultStyles = 'rounded-md flex items-center px-4 py-3 font-normal'

// The Button functional component
export function Button({ variant, text, startIcon, onClick, fullWidth, loading }: ButtonProps) {
  return (
      // A button element with dynamic class names and properties
      <button onClick={onClick} className={variantStyles[variant] + " " + defaultStyles + `${fullWidth ? " w-full flex justify-center items-center" : ""} ${loading ? "opacity-45" : ""}` } disabled={loading} >
          {/* Container for optional start icon */}
          <div className="pr-2">
              {startIcon}
          </div>
          {/* Button text */}
          {text}
      </button>
  );
}
