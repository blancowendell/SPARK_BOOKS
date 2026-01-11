import React, { useState, useRef, useEffect } from "react";

const DropdownCustom = ({
  options = [],
  onMenuClick,
  buttonText = "Select",
  buttonIcon,
  buttonClassName = "",
  dropdownClassName = "",
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!options.length) return null;

  const handleItemClick = (key) => {
    onMenuClick && onMenuClick(key);
    setOpen(false);
  };

  return (
    <div
      ref={dropdownRef}
      className={`custom-dropdown-container ${buttonClassName}`}
      style={{ position: "relative", display: "inline-block" }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="custom-dropdown-btn"
        type="button"
        aria-expanded={open}
      >
        {buttonIcon && <span className="btn-icon">{buttonIcon}</span>}
        <span>{buttonText}</span>
        <span className="btn-arrow">▼</span>
      </button>

      {open && (
        <ul
          className={`custom-dropdown-menu ${dropdownClassName}`}
          role="menu"
          aria-hidden={!open}
        >
          {options.map(({ key, label }) => (
            <li
              key={key}
              className="custom-dropdown-item"
              onClick={() => handleItemClick(key)}
              role="menuitem"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") handleItemClick(key);
              }}
            >
              {label}
            </li>
          ))}
        </ul>
      )}

      <style>{`
        .custom-dropdown-btn {
          background-color: var(--main-color);
          color: var(--main-text-color);
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.15);
          transition: background-color 0.3s ease, transform 0.2s ease;
          font-weight: 600;
          user-select: none;
          font-size: 1rem;
          outline-offset: 2px;
          outline-color: transparent;
        }
        .custom-dropdown-btn:hover,
        .custom-dropdown-btn:focus {
          background-color: var(--main-hover-color);
          outline-color: var(--main-text-color);
        }
        .btn-arrow {
          margin-left: auto;
          font-size: 0.8rem;
          user-select: none;
          transition: transform 0.3s ease;
          transform: rotate(${open ? "180deg" : "0deg"});
        }
        .btn-icon {
          display: flex;
          align-items: center;
        }
        .custom-dropdown-menu {
          position: absolute;
          top: 100%;
          left: 0;
          margin-top: 6px;
          background: #f9f9f9; /* light background */
          border-radius: 6px;
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
          list-style: none;
          padding: 0;
          min-width: 160px;
          z-index: 1000;
          color: #000; /* black text */
          opacity: 0;
          transform: translateY(-10px);
          animation: fadeSlideDown 0.25s forwards;
        }
        @keyframes fadeSlideDown {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .custom-dropdown-item {
          padding: 10px 16px;
          cursor: pointer;
          user-select: none;
          transition: background-color 0.2s ease;
        }
        .custom-dropdown-item:hover,
        .custom-dropdown-item:focus {
          background-color: #e2e2e2; /* subtle hover */
          outline: none;
        }
      `}</style>
    </div>
  );
};

export default DropdownCustom;
