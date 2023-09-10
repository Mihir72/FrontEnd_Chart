import React, { useEffect, useState } from 'react';
import { MultiSelect } from "react-multi-select-component";
const DropdownWithChecklist = ({ option, onChange }) => {
  const [convertedOptions, setConvertedOptions] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {

    if (option == null || option.length === 0) {
      return;
    }

    const options = option.map((str) => ({
        label: str,
        value: str,
      }));
        setConvertedOptions(options);
    }, [option]);      

    useEffect(() => {
      console.log(selected);
      const selectedValues = selected.map((obj) => obj.value);
      onChange(selectedValues);
      
    }, [selected]);

    return (
      <div className='dropdown'>
        <MultiSelect
        options={convertedOptions}
        value={selected}
        onChange={setSelected}
        labelledBy="Select"
      />
      </div>
    );
};

export default DropdownWithChecklist;



