"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { CustomDropdownProps } from "../types";

export default function CustomDropdown({
  label,
  placeholder,
  options,
  value,
  onChange,
  required
}: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(opt => opt.value === value);

  // Schließen wenn außerhalb geklickt
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label} {required && "*"}
      </label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-3 border rounded-lg text-left flex items-center justify-between transition text-base ${
          isOpen
            ? "border-[#A68A75] ring-2 ring-[#A68A75]"
            : "border-gray-300 hover:border-gray-400"
        } ${selectedOption ? "text-gray-900" : "text-gray-400"}`}
      >
        <span>{selectedOption ? selectedOption.label : placeholder}</span>
        <span className={`material-icons text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`} aria-hidden="true">
          expand_more
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden"
          >
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-3 text-left transition flex items-center justify-between ${
                  option.value === value
                    ? "bg-[#F5F0EB] text-[#A68A75] font-semibold"
                    : "hover:bg-gray-50 text-gray-700"
                }`}
              >
                <span>{option.label}</span>
                {option.value === value && (
                  <span className="material-icons text-[#A68A75] text-lg" aria-hidden="true">check</span>
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
