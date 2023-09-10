import React, { useState } from 'react';

const DropdownWithChecklist = ({ options, onChange }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    let newSelectedOptions = [...selectedOptions];
    if (newSelectedOptions.includes(value)) {
      newSelectedOptions = newSelectedOptions.filter(option => option !== value);
    } else {
      newSelectedOptions.push(value);
    }
    setSelectedOptions(newSelectedOptions);
    onChange(newSelectedOptions);
   
  };

  if (Array.isArray(options)) {
    return (
      <div className='dropdown'>
        {options.map((option, index) => (
          <label key={index} className="checkbox-label">
            <input
              type="checkbox"
              value={option}
              checked={selectedOptions.includes(option)}
              onChange={handleCheckboxChange}
            />
            <span></span>
            {option}
          </label>
        ))}
      </div>
    );
  } else {
    return null;
  }
};

export default DropdownWithChecklist;