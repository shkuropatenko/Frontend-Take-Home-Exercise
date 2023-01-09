import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

import Input from "./components/input";

const schema = yup.object({
  name: yup.string().min(2, "must be at least 2 characters").required("Full Name is a required field"),
  email: yup.string().required("is a required field").email("Email is not valid!"),
  password: yup.string().min(8, "must be at least 8 characters").required(),
  occupation: yup.string().required("is a required field"),
  state: yup.string().required("is a required field")
});

function App() {
  const { handleSubmit, register, formState: { errors }, control } = useForm({
    resolver: yupResolver(schema)
  });
  const [selectOption, setSelectOption] = useState([]);
  const [statusOk, setStatusOk] = useState(false);
  const arrStates = [];
  const arrOccupations = [];

  useEffect(() => {
    const getSelect = async () => {
      const res = await fetch(`${process.env.REACT_APP_API_URL}`);
      const getSelectOptions = await res.json();
      setSelectOption(await getSelectOptions);
    }

    getSelect();
  }, []);

  const formSubmit = data => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}`,
        data,
        setStatusOk(true),
        { headers: { "Content-Type": "application/json" } }
      )
      .then(response => { console.log(response.data) })
      .catch(error => { console.log(error.data) });
  };

  selectOption?.states?.map(item => {
    return arrStates.push({
      label: item.abbreviation,
      value: item.name
    })
  })

  selectOption?.occupations?.map(item => {
    return arrOccupations.push({
      label: item,
      value: item
    })
  })

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit(formSubmit)} className={`user-form ${statusOk ? "success" : ""}`}>
        <fieldset>
          <legend>Our contact details</legend>
          <Input
            id="name"
            label="Full Name"
            type="text"
            placeholder="Full Name"
            isDisabled={statusOk}
            register={{ ...register("name") }}
            errorsMessage={errors.fullName?.message}
          />
          <Input
            id="email"
            label="Email"
            type="email"
            placeholder="Email"
            isDisabled={statusOk}
            register={{ ...register("email") }}
            errorsMessage={errors.email?.message}
          />
          <Input
            id="password"
            label="Password"
            type="password"
            placeholder="Enter Password"
            isDisabled={statusOk}
            register={{ ...register("password") }}
            errorsMessage={errors.password?.message}
          />
          <Input
            label="State"
            tag="select"
            name="state"
            arr={arrStates}
            control={control}
            isDisabled={statusOk}
            register={{ ...register("state") }}
            errorsMessage={errors.state?.message}
          />
          <Input
            label="Occupation"
            tag="select"
            name="occupation"
            arr={arrOccupations}
            control={control}
            isDisabled={statusOk}
            register={{ ...register("occupation") }}
            errorsMessage={errors.occupation?.message}
          />
          <button type="submit">Sign Up</button>
          <span className="request-text">Request sent successfully!</span>
        </fieldset>
      </form>
    </div>
  );
}

export default App;
