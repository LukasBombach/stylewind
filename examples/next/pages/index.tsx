import type { NextPage } from "next";
import styled from "tailwind-react";

const Headline = styled("h1", "text-xl font-bold");
const Link = styled("a", "text-m underline");

const Home: NextPage = () => {
  return (
    <main>
      <Headline>Headline</Headline>
      <Link href="/">Link</Link>
    </main>
  );
};

export default Home;
