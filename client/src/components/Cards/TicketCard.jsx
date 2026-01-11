import React from "react";

const TicketCard = ({ title, description, footer, children, className = "" }) => {
  return (
    <div
      className={`p-4 rounded-xl shadow bg-white border hover:bg-gray-50 transition ${className}`}
    >
      {title && <h4 className="text-lg font-semibold mb-2">{title}</h4>}
      {description && <p className="text-sm text-gray-600">{description}</p>}
      {children}
      {footer && (
        <div className="text-xs mt-4 text-right text-gray-400">{footer}</div>
      )}
    </div>
  );
};

export default TicketCard;
