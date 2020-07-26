import styled from "stylewind";

const Input = styled.input({
  bg: "gray-200",
  appearance: "none",
  border: [2, "gray-200"],
  rounded: true,
  w: "full",
  py: 2,
  px: 4,
  text: "gray-700",
  leading: "tight",
  "focus:outline": "none",
  "focus:bg": "white",
  "focus:border": "purple-500",
});

export default Input;
