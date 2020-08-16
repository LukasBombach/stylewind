![](https://github.com/LukasBombach/stylewind/blob/master/documentation/logo.svg)

# Stylewind

Styled Components API for Tailwind CSS in just `427 B`

<p>
    <a href="https://github.com/stylewind/releases"><img src="https://img.shields.io/npm/v/stylewind.svg" alt="Latest Release"></a>
    <a href="https://github.com/stylewind/blob/master/LICENSE"><img src="https://img.shields.io/npm/l/stylewind.svg" alt="License"></a>
</p>

---

Create components by passing Tailwind properties to the styled api

```tsx
import React from "react";
import styled from "stylewind";

const Button = styled.button({
  text: "white",
  font: "bold",
  rounded: "sm",
  shadow: "md",
  bg: "purple-500",
  p: 4,
});

export default () => <Button>My Button</Button>;
```

the rendered result will be a component with the corresponding `className`s.

```html
<button class="text-white font-bold rounded-sm shadow-md p-4 bg-purple-500 hover:bg-purple-400 focus:outline-none">
  My Button
</button>
```

And will look like this

![](https://github.com/LukasBombach/stylewind/blob/master/documentation/button.png)

## Installation

```bash
yarn add stylewind # npm i stylewind
```

`stylewind` generates components that have Tailwind's class names applied, but it does not add Tailwind CSS to your project.
This way, you can decide how you want to add Tailwind to your project, but in order to see its styles, you need to add
it to you project.

To learn how to install Tailwind CSS, [follow the guides on tailwindcss.com](https://tailwindcss.com/docs/installation).

## Usage
