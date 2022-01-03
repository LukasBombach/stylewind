import type { NextPage } from "next";
import styled from "tailwind-react";

const Test = styled("div", "text-3xl font-bold underline");

const Home: NextPage = () => {
  return (
    <main>
      <h1 className="">
        Welcome to <a href="https://nextjs.org">Next.js!</a>
      </h1>

      <Test>test</Test>
    </main>
  );
};

export default Home;
