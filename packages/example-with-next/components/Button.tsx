import styled from "stylewind";

const Button = styled.button({
  shadow: [true, "focus:outline"],
  rounded: true,
  bg: ["purple-500", "hover:purple-400"],
  text: "white",
  font: "bold",
  py: 2,
  px: 4,
  outline: "focus:none",
});

export default Button;
