import styled from "stylewind";
import Card from "../components/Card";
import Label from "../components/Label";
import Input from "../components/Input";

const Layout = styled.main({
  container: true,
  mx: "auto",
});

const Grid = styled.div({
  "sm:grid": "cols-1",
  "md:grid": "cols-3",
  gap: 4,
});

const Headline = styled.h1({
  font: "bold",
  text: "3xl",
  mb: 2,
});

const NewsletterSignup = styled.footer({
  "md:flex": true,
  "md:items": "center",
});

const NewsLetterHeadline = styled.h2({
  text: "xl",
  mb: 12,
});

const Left = styled.div({
  "md:w": "1/12",
});

const Right = styled.div({
  "md:w": "4/12",
});

const IndexPage = () => (
  <Layout>
    <Headline>Hello Next.js with stylewind 👋</Headline>
    <Grid>
      <Card />
      <Card />
      <Card />
    </Grid>
    <NewsletterSignup>
      <NewsLetterHeadline>Signup (fake)</NewsLetterHeadline>
      <Left>
        <Label for="email-input">Email</Label>
      </Left>
      <Right>
        <Input
          id="email-input"
          type="text"
          placeholder="won't work, this is just fake UI"
        />
      </Right>
    </NewsletterSignup>
  </Layout>
);

export default IndexPage;
