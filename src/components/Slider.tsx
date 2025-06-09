import React from 'react';

type SliderProps = {
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
  className?: string;
};

const Slider = ({ min, max, step = 0.1, value, onChange, className = '' }: SliderProps) => {
  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(parseFloat(e.target.value))}
      className={`w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-white ${className}`}
    />
  );
};

export default Slider;
