import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Password } from "primereact/password";
import { classNames } from "primereact/utils";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import React, { useEffect, useState } from "react";
import { DropdownInterface } from "./types";

type InputCustomeProps = {
  value: string;
  setValue: (text: string) => void;
  isError: boolean;
  error?: string;
  id: string;
  label: string;
  data?: DropdownInterface[] | [];
  type?: "text" | "password" | "dropdown" | "textarea";
};

export default function InputCustome({
  type = "text",
  value,
  setValue,
  error,
  isError,
  id,
  data = [],
  label,
}: InputCustomeProps) {
  const [dropdownSelect, setDropdownSelect] =
    useState<DropdownInterface | null>(null);

  function changeValue(code: string) {
    setValue(code);
  }

  useEffect(() => {
    if (dropdownSelect !== null) {
      changeValue(dropdownSelect.code);
    }
  }, [dropdownSelect]);

  return (
    <div className="mb-2">
      <span className="p-float-label">
        {type === "text" ? (
          <InputText
            id={id}
            name={id}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            className={classNames({
              "p-invalid": isError,
              "w-full": true,
            })}
          />
        ) : type === "password" ? (
          <Password
            id={id}
            name={id}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            className={classNames({
              "p-invalid": isError,
              "w-full": true,
            })}
            toggleMask
            feedback={false}
          />
        ) : type === "dropdown" ? (
          <Dropdown
            inputId={id}
            name={id}
            options={data}
            value={dropdownSelect}
            placeholder={label}
            onChange={(e) => {
              setDropdownSelect(e.value);
            }}
            className={classNames({
              "p-invalid": isError,
              "w-full": true,
            })}
            optionLabel="name"
          />
        ) : type === "textarea" ? (
          <InputTextarea
            id={id}
            name={id}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            className={classNames({
              "p-invalid": isError,
              "w-full": true,
            })}
          />
        ) : null}

        <label htmlFor="input_value">{label}</label>
      </span>
      {error && <small className="p-error">{error}</small>}
    </div>
  );
}
