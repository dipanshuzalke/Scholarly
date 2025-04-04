interface InputProps {
    placeholder: string;
    reference?: any;
    multiline?: boolean; // ✅ Optional prop for description field
  }
  
  export function Input({ placeholder, reference, multiline = false }: InputProps) {
    const baseClasses =
      "w-full px-4 py-3 border border-gray-300 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-800";
  
    return (
      <div className="w-full">
        {multiline ? (
          <textarea
            ref={reference}
            placeholder={placeholder}
            className={`${baseClasses} min-h-[120px] resize-none`}
          />
        ) : (
          <input
            ref={reference}
            placeholder={placeholder}
            type="text"
            className={baseClasses}
          />
        )}
      </div>
    );
  }
  