import styled from "stylewind";

const Input = styled.input({
  bg: ["gray-200", "focus:white"],
  appearance: "none",
  border: [2, "gray-200", "focus:purple-500"],
  rounded: true,
  w: "full",
  py: 2,
  px: 4,
  text: "gray-700",
  leading: "tight",
  outline: "focus:none",
});

export default Input;
