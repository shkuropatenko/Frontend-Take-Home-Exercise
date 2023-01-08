import './App.css';
import Input from './components/input';
import Select from 'react-select';

import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "./axiosInstance";

const schema = yup.object().shape({
  name: yup.string().required("Full Name is a required field"),
  email: yup.string().required("Email is a required field").email("Email is not valid!"),
  password: yup.string().min(8, "Password must be at least 8 characters").required(),
  occupation: yup.string().required("occupation is a required field"),
  state: yup.string().required("Select State")
});

function App() {
  const { handleSubmit, register, formState: { errors }, control } = useForm({
    resolver: yupResolver(schema)
  });

  const methods = useForm();
  const default_value = 1;

  const [selectOption, setSelectOption] = useState([]);
  useEffect(() => {
    const getSelect = async () => {
      const res = await fetch('https://frontend-take-home.fetchrewards.com/form');
      const getSelectOptions = await res.json();
      setSelectOption(await getSelectOptions);
    }

    getSelect();
  }, []);

  const [selectedYear, setSelectedYear] = useState("");
  const handleYearChange = (selectedYear) => {
    setSelectedYear(selectedYear);
  };

  const formSubmit = data => {
    console.log(data)
    axios
      .post(
        'https://frontend-take-home.fetchrewards.com/form',
        data,
        { headers: { 'Content-Type': 'application/json' } }
      )
      .then(response => { console.log(response.data) })
      .catch(error => { console.log(error.data) });
  };

  const arrStates = [];
  const arrOccupations = [];

  const objStates = selectOption?.states?.map(item => {
    return arrStates.push({
      label: item.abbreviation,
      value: item.name
    })
  })

  const objOccupations = selectOption?.occupations?.map(item => {
    return arrOccupations.push({
      label: item,
      value: item
    })
  })
  console.log(selectOption)

  return (
    <div className="App">
      <form onSubmit={handleSubmit(formSubmit)}>
        <Input
          id="name"
          label="Full Name"
          type="text"
          placeholder="Full Name"
          register={{ ...register("name") }}
          errorsMessage={errors.fullName?.message}
        />
        <Input
          id="email"
          label="Email"
          type="email"
          placeholder="Email"
          register={{ ...register("email") }}
          errorsMessage={errors.email?.message}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          placeholder="Enter Password"
          register={{ ...register("password") }}
          errorsMessage={errors.password?.message}
        />
        <Controller
          control={control}
          defaultValue={arrStates.map(c => c.value)}
          name="state"
          render={({ field: { onChange, value, ref } }) => (
            <Select
              inputRef={ref}
              value={arrStates.filter(c => value.includes(c.value))}
              onChange={val => onChange(val.value)}
              register={{ ...register("state") }}
              options={arrStates}
            />
          )}
        />
        <Controller
          control={control}
          defaultValue={arrOccupations.map(c => c.value)}
          name="occupation"
          render={({ field: { onChange, value, ref } }) => (
            <Select
              inputRef={ref}
              value={arrOccupations.filter(c => value.includes(c.value))}
              onChange={val => onChange(val.value)}
              register={{ ...register("state") }}
              options={arrOccupations}
            />
          )}
        />
        <button>Sign Up</button>
      </form>
    </div >
  );
}

export default App;
