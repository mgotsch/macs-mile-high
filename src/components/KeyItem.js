import React from 'react';

export default function KeyItem({ label, value, onChange }) {
  return (
    <div className="key-item">
      <input
        type="checkbox"
        name={label}
        id={label}
        checked={value}
        onChange={onChange}
      />
      <div className={`marker marker-${label.toLowerCase()}`}></div>
      <label htmlFor={label}>{label}</label>
    </div>
  );
}