
import { useState } from "react";

const useInput = (initialValue) => {
  const [values, setValues] = useState(initialValue);

  const handleChange = (text,name) => {
    console.log(text)
    console.log(name)
    // const { name, value } = e.target;
    // setValues({
    //   ...values,
    //   [name]: value,
    // });
  };

  return{
    values,
    handleChange
  }
};

export default useInput
