import Select from "react-select";
import { Controller } from "react-hook-form";

export default function Input({ tag, id, label, placeholder, type, register, errorsMessage, name, arr, control, isDisabled }) {
  let input = (
    <input
      placeholder={placeholder}
      type={type}
      id={id}
      disabled={isDisabled}
      {...register}
      className="input"
    />
  )

  if (tag === "select") {
    return (
      input = <label>
        <div>
          {label}{" "}
          <span className="error-message">{errorsMessage}</span>
        </div>
        <Controller
          control={control}
          defaultValue={arr.map(c => c.value)}
          name={name}
          render={({ field: { onChange, value, ref } }) => (
            <Select
              inputRef={ref}
              value={arr.filter(c => value.includes(c.value))}
              onChange={val => onChange(val.value)}
              register={{ ...register }}
              options={arr}
              isDisabled={isDisabled}
            />
          )}
        />
      </label>
    );
  }

  return (
    <label>
      <div>
        {label}{" "}
        <span className="error-message">{errorsMessage}</span>
      </div>
      {input}
    </label>
  )
}