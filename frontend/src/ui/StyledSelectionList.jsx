import React, { useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ReactComponent as UpDownIcon } from "../assets/icons/UpDownIcon.svg";

const StyledSelectionList = ({
  options,
  label,
  onChange = () => {},
  listname,
  selectedOption,
}) => {
  const [selected, setSelected] = useState(selectedOption);
  // console.log("selected",selected)
  useEffect(() => {
    setSelected(selectedOption);
  }, [selectedOption]);
  const handleChange = (value) => {
    setSelected(value);
    onChange(value.value);
  };

  return (
    <Listbox value={selected} onChange={handleChange}>
      <div className="flex flex-col">
        <Listbox.Label className="text-sm font-medium text-gray-700">
          {label}
        </Listbox.Label>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-md border bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:outline-none focus:ring-1 sm:text-sm border-gray-300 text-gray-900 focus:border-purple-300 focus:ring-purple-500 ">
            <span className="block truncate">
              {selected && selected.name
                ? selected.name
                : label
                ? `Select ${label}`
                : listname
                ? listname
                : "select"}
            </span>

            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <UpDownIcon className="h-5 w-5 text-gray-400" />
            </span>
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
                      {selected ? (
                        <span className="absolute inset-y-0 right-0 flex items-center pr-4 ">
                          <UpDownIcon className="h-5 w-5" />
                        </span>
                      ) : null}
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

export default StyledSelectionList;
