import type { NextPage } from "next";
import styled from "tailwind-react";

const Headline = styled.h1(`text-xl font-bold`);

const Link = styled.a(`text-m underline`);

const Button = styled.button(`
  text-sm
  font-semibold
  bg-gray-800
  text-gray-300
  py-3
  px-4
  rounded-lg
  hover:bg-gray-700
  focus:outline-none
  focus-visible:ring-2
  focus-visible:ring-gray-700
  focus-visible:ring-offset-2
  focus-visible:ring-offset-gray-900`);

const Home: NextPage = () => {
  return (
    <main>
      <Headline>Headline</Headline>
      <Link href="/">Link</Link>
      <Button>Button</Button>
    </main>
  );
};

export default Home;
