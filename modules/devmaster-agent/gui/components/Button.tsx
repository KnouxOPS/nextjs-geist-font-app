"use client";

import * as React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
  label: string;
}

export function Button({ onClick, label, ...props }: ButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      {...props}
      className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors duration-200"
    >
      {label}
    </button>
  );
}
