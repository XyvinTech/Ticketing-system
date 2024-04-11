import React from 'react';

const StyledInput = ({ label, placeholder, type, disabled, Icon, onChange, name, value }) => {
  return (
    <div>
      <label className="mb-1 block text-sm font- text-gray-900">
        {label}
      </label>

      <div className="relative rounded-md shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          {Icon && <Icon className="h-5 w-5 text-gray-400" />}
        </div>

        <input
          type={type}
          placeholder={placeholder}
          autoComplete={type === 'password' ? 'password' : ''}
          disabled={disabled}
          className={`block w-full rounded-md border-gray-300 py-2 text-gray-900 shadow-sm ring-1 ring-inset 
          ring-gray-300 placeholder:text-gray-400 focus:ring-purple-600 sm:text-sm sm:leading-6 focus:outline-none
          ${
            disabled ? 'bg-gray-100' : ''
          } ${Icon ? 'pl-10' : 'pl-3'}`}
          onChange={onChange} 
          name={name} 
          value={value} // Adding value prop here
        />
      </div>
    </div>
  );
};

export default StyledInput;
