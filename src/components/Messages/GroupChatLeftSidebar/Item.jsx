import React from "react";
import { Link } from "react-router-dom";

const Item = ({ to, group, isActive }) => {
  const mainClasses = [
    "flex",
    "border-t border-gray-200",
    "px-2 py-4",
    isActive ? "bg-gray-100" : "",
  ].join(" ");

  return (
    <Link to={to}>
      <div
        className={mainClasses}
        style={{ borderLeft: isActive ? "2px solid #6366f1" : "none" }}
      >
        <img
          src={group.avatar}
          alt={group.avatar}
          className="w-9 h-9 rounded-full object-cover bg-black"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/assets/fallback_img.webp";
          }}
        />

        <div className="w-4/5 pl-3">
          <h1 className="text-sm font-semibold truncate">{group.name}</h1>
          <p className="text-xs truncate text-gray-500">{group.description}</p>
        </div>
      </div>
    </Link>
  );
};

export default Item;
