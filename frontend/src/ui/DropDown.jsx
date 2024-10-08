import React, { useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ReactComponent as FilterIcon } from "../assets/icons/FilterIcon.svg";

const DropDown= ({ options, label, onChange = () => {}}) => {
  const [selected, setSelected] = useState(null);

  const handleChange = (value) => {
    setSelected(value);
    onChange(value.value); 
  };

  return (
    <Listbox value={selected} onChange={handleChange}>
      <div className="flex flex-col">
        <div className="relative mt-1">
        <Listbox.Button className="relative w-full cursor-default rounded-md border bg-white py-2 pl-10 pr-3 text-left shadow-sm focus:outline-none focus:ring-1 sm:text-sm border-gray-300 text-gray-900 focus:border-purple-300 focus:ring-purple-500">

  <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
    <FilterIcon className="h-5 w-5 text-gray-400" />
  </span>
  <span className="block truncate">{selected ? selected.name :  ` ${label}` }</span>
</Listbox.Button>

          <Transition
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {options.map((option, index) => (
                <Listbox.Option
                  key={index}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-3 pr-9 ${
                      active ? "bg-purple-600 text-white" : "text-gray-900"
                    }`
                  }
                  value={option}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-semibold" : "font-normal"
                        }`}
                      >
                        {option.name}
                      </span>
                    
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </div>
    </Listbox>
  );
};

export default DropDown;
