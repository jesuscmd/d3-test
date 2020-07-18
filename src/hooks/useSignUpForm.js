import { useState } from "react";

const useSignUpForm = (success, fallback) => {
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSucess] = useState(false);

  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }
    if (inputs.email === "admin" && inputs.password === "1234") {
      success();
      setIsSucess(true);
      setIsError(false);
    } else {
      setIsSucess(false);
      setIsError(true);
      fallback();
    }
  };
  const handleInputChange = (event) => {
    event.persist();
    setInputs((inputs) => ({
      ...inputs,
      [event.target.name]: event.target.value,
    }));
  };
  return {
    handleSubmit,
    handleInputChange,
    inputs,
    isError,
    isSuccess,
  };
};

export default useSignUpForm;
