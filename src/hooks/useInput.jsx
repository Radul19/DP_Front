
import { useState } from "react";

const useInput = (initialValue) => {
  const [values, setValues] = useState(initialValue);

  const handleChange = (text,name) => {

  };

  return{
    values,
    handleChange
  }
};

export default useInput
