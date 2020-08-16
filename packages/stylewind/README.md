![](https://github.com/LukasBombach/stylewind/blob/master/documentation/logo.svg)

# Stylewind

**Styled Components API for Tailwind CSS in just `427 B`**

Create components by passing Tailwind properties to the styled api

```tsx
import React from "react";
import styled from "stylewind";

const Button = styled.button({
  text: "white",
  font: "bold",
  rounded: "sm",
  shadow: "md",
  p: 4,
  bg: ["purple-500", "hover:purple-400"],
  outline: "focus:none",
});

export default () => <Button>My Button</Button>;
```

the rendered result will be a component with the corresponding `className`s.

```html
<button class="text-white font-bold rounded-sm shadow-md p-4 bg-purple-500 hover:bg-purple-400 focus:outline-none">
  My Button
</button>
```

## Installation

```bash
yarn add stylewind # npm i stylewind
```

## Usage
