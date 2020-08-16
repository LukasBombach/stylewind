![](https://github.com/LukasBombach/stylewind/blob/master/documentation/logo.svg)

# Stylewind

Styled Components API for Tailwind CSS in just `427 B`

<p>
    <a href="https://github.com/stylewind/releases"><img src="https://img.shields.io/npm/v/stylewind.svg" alt="Latest Release"></a>
    <a href="https://github.com/stylewind/blob/master/LICENSE"><img src="https://img.shields.io/npm/l/stylewind.svg" alt="License"></a>
    <a href="http://www.typescriptlang.org"><img src="https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg" alt="TypeScript"></a>
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

> `stylewind` generates components that have Tailwind's class names applied, but it does not add Tailwind CSS to your project.
> This way, you can decide how you want to add Tailwind to your project, but in order to see its styles, you need to add
> it to you project.

To learn how to install Tailwind CSS, [follow the guides on tailwindcss.com](https://tailwindcss.com/docs/installation).

## Usage

```tsx
import React from "react";
import styled from "stylewind";

// You can create components with specific tags similar to the styled components API
const Headline = styled.h1();

// Instead of passing a template string of CSS, you provide an object of Tailwind properties
const Button = styled.button({
  text: "white",
  font: "bold",
  bg: "purple-500",
});

// Sometimes you need to add multiple values for one property, for this, you'll pass an array
const Blockquote = styled.blockquote({
  text: ["purple-700", "opacity-75"],
});

// The same goes for responsive props, just use prefixes to your values
const Grid = styled.section({
  grid: ["sm:cols-1", "md:cols-3"],
  gap: 4,
});

// States like hover and active work the same way
const Link = styled.a({
  text: ["purple-500", "hover:purple-400", "active:purple-100"],
});

// You can add multiple prefixes, just like with "native" Tailwind CSS
const Link = styled.a({
  text: ["purple-500", "hover:purple-400", "md:hover:purple-200"],
});
```

### Prop Names and Values

The prop names and their values are based on Tailwind and follow this pattern;

```
Each Tailwind CSS class has the following parts, and exept for the name all of them are optional

md:hover:text-purple-500
^^^^^^^^
prefixes

md:hover:text-purple-500
         ^^^^
         the property name

md:hover:text-purple-500
              ^^^^^^^^^^
              the value
```

For `stylewind` you now would pass

```tsx
const Link = styled.a({
  name: prefixes + ":" value,

  // so md:hover:text-purple-200 becomes
  text: "md:hover:purple-200",
});
```

For an overiew of the all props, you can read the definitions in [their TypeScript definitions file](../stylewind-bridge/dist/index.d.ts)

### Typescript

The API and the generated components have full TypeScript support
