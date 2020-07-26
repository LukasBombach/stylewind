import styled from "stylewind";

const Button = styled.button({
  shadow: true,
  rounded: true,
  bg: "purple-500",
  text: "white",
  font: "bold",
  py: 2,
  px: 4,
  "hover:bg": "purple-400",
  "focus:shadow": "outline",
  "focus:outline": "none",
});

export default Button;
