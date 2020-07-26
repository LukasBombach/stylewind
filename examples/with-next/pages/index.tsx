import styled from "stylewind";
import Card from "../components/Card";

const Layout = styled.main({
  container: true,
  mx: "auto",
});

const Grid = styled.div({
  grid: [true, "cols-3"],
  gap: 4,
});

const Headline = styled.h1({
  font: "bold",
  text: "3xl",
  mb: 2,
});

const IndexPage = () => (
  <Layout>
    <Headline>Hello Next.js with stylewind 👋</Headline>
    <Grid>
      <Card />
      <Card />
      <Card />
    </Grid>
  </Layout>
);

export default IndexPage;
