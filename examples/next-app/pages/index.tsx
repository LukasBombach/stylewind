import styled from "stylewind";
import Card from "../components/Card";

const Layout = styled.main({
  container: true,
  mx: "auto",
});

const Headline = styled.h1({
  font: "bold",
  text: "3xl",
  mb: 2,
});

const IndexPage = () => (
  <Layout>
    <Headline>Hello Next.js with stylewind 👋</Headline>
    <Card />
  </Layout>
);

export default IndexPage;
