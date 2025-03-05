"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type OptionType = {
  label: string;
  value: string | number;
};

type DropdownProps = {
  placeholder?: string;
  value?: OptionType | undefined;
  options?: OptionType[];
  onChange?: (option: OptionType) => void;
};

export default function Dropdown(props: DropdownProps) {
  const { placeholder, value, options = [], onChange } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<OptionType | null>(value || null);

  const dropdownRef = useRef<HTMLDivElement>(null);

  function handleClick(option: OptionType) {
    setSelected(option);
    setIsOpen(false);

    if (onChange) onChange(option);
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Dropdown Button */}
      <button
        data-testid="qa-dropdown-button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between shadow-input-box outline-0 px-4 py-3 bg-white w-full rounded-xl border border-white"
      >
        {!!selected ? (
          <span className="text-base" data-testid="qa-selected-dropdown">
            {selected.label}
          </span>
        ) : (
          <span className="text-xs text-slate-300">
            {placeholder || "Select..."}
          </span>
        )}

        <Image src="/icons/nav-arrow-down.svg" width={24} height={24} alt="" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <ul className="absolute left-0 mt-1 w-full bg-white rounded-lg shadow-lg z-10" data-testid="qa-menu-wrapper-dropdown">
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => handleClick(option)}
              className="px-4 py-3 cursor-pointer hover:bg-gray-100 text-base"
            >
              {option.label}
            </li>
          ))}
          {options.length === 0 && (
            <li className="text-xs text-center text-slate-300 py-3">No data</li>
          )}
        </ul>
      )}
    </div>
  );
}
