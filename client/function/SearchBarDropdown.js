import React, { useEffect, useState } from "react";
import withClickOutside from "./withClickOutside";

const SelectComponent = React.forwardRef(
  (

    {
      options,
      placeholder = "",
      onChange,
      selectedKey,
      open,
      setOpen,
      defaultValue,
    },
    ref
  ) => {
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
      if (selectedKey) {
        const selectedOption = options.find((o) => o.key === selectedKey);
        if (selectedOption) {
          setInputValue(selectedOption.value);
        }
      }  else if (defaultValue) {
        const defaultOption = options.find((o) => o.key === defaultValue);
        if (defaultOption) {
          setInputValue(defaultOption.value);
        }
      }
    }, [selectedKey, defaultValue, options]);

    useEffect(() => {
      if (!open && options.findIndex((o) => o.value === inputValue) === -1) {
        if (!inputValue) {
          onChange("");
        } else {
          if (selectedKey) {
            setInputValue(options.find((o) => o.key === selectedKey).value);
          } else {
            setInputValue("");
          }
        }
      }
    }, [open, options, selectedKey, inputValue, onChange]);

    const onInputChange = (e) => {
      setInputValue(e.target.value);
    };

    const onInputClick = () => {
      setOpen((prevValue) => !prevValue);
    };

    const onOptionSelected = (option) => {
      onChange !== undefined && onChange(option.key);
      onChange !== undefined && setInputValue(option.value);
      setOpen(false);
    };

    const clearDropdown = () => {
      setInputValue("");
      onChange("");
    };

    return (
      <div className="dropdown-container position-relative" ref={ref}>
        <div
          className="input-container d-flex align-items-center"
          onClick={onInputClick}
        >
          <div>
            <input
              type="text"
              className="form-control flex-grow-1"
              value={inputValue}
              placeholder={placeholder}
              onChange={onInputChange}
            />
          </div>

          {selectedKey || inputValue ? (
            <button
              type="button"
              className="btn input-clean-container"
              onClick={clearDropdown}
            >
              x
            </button>
          ) : null}
        </div>

        <div
          className={`dropdown-menu ${
            open ? "show" : ""
          } border-0 overflow-auto shadow`}
          style={{ maxHeight: "100px" }}
        >
          {options
            .filter((item) => {
              const searchTerm = inputValue.toLowerCase();
              const v = item.value.toLowerCase();

              if (!searchTerm) return true;

              return v.startsWith(searchTerm);
            })
            .map((opt) => (
              <li
                key={opt.key}
                onClick={() => onOptionSelected(opt)}
                className="list-group-item"
                value={opt.key}
              >
                {opt.value}
              </li>
            ))}
        </div>
      </div>
    );
  }
);

export default withClickOutside(SelectComponent);