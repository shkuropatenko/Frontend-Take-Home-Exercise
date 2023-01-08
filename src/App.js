import './App.css';
import Input from './components/input';

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  name: yup.string().required("Full Name is a required field"),
  email: yup.string().required("Email is a required field").email("Email is not valid!"),
  password: yup.string().min(8, "Password must be at least 8 characters").required(),
  confirmPassword: yup.string().oneOf([yup.ref("password")], "Password must be match."),
  // occupation:,
  // state:,
});

function App() {
  const { handleSubmit, register, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const formSubmit = (data) => {
    console.log(data);
  }

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
        <Input
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="Confirm Password"
          register={{ ...register("confirmPassword") }}
          errorsMessage={errors.confirmPassword?.message}
        />
        <button>Sign Up</button>
      </form>
    </div>
  );
}

export default App;
