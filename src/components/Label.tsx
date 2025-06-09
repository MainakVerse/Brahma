import React from 'react';

type LabelProps = {
  htmlFor?: string;
  children: React.ReactNode;
  className?: string;
};

const Label = ({ htmlFor, children, className = '' }: LabelProps) => {
  return (
    <label htmlFor={htmlFor} className={`block text-sm text-white mb-1 font-medium ${className}`}>
      {children}
    </label>
  );
};

export default Label;
