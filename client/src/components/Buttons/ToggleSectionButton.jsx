import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const ToggleSectionButton = ({ isOpen, onClick, label = "" }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center gap-1 px-3 py-2 bg-white shadow-lg rounded-lg border transition hover:scale-105"
      style={{
        color: "var(--main-color)",
        borderColor: "var(--main-color)",
      }}
    >
      <span className="text-sm font-semibold">{label}</span>
      {isOpen ? (
        <ChevronUp size={18} strokeWidth={2.5} />
      ) : (
        <ChevronDown size={18} strokeWidth={2.5} />
      )}
    </button>
  );
};

export default ToggleSectionButton;
