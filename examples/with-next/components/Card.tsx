import styled from "stylewind";

const Container = styled.article({
  max: "w-sm",
  overflow: "hidden",
  shadow: "lg",
  rounded: true,
});

const Img = styled("img", {
  w: "full",
});

const Header = styled.header({
  px: 6,
  py: 4,
});

const Headline = styled.h2({
  font: "bold",
  text: "xl",
  mb: 2,
});

const Intro = styled.p({
  text: ["gray-700", "base"],
});

const Body = styled.p({
  px: 6,
  py: 4,
});

const Tag = styled.span({
  inline: "block",
  bg: "gray-200",
  rounded: "full",
  px: 3,
  py: 1,
  text: ["sm", "gray-700"],
  font: "semibold",
  mr: 2,
});

const Card = () => (
  <Container>
    <Img
      src="https://tailwindcss.com/img/card-top.jpg"
      alt="Sunset in the mountains"
    />
    <Header>
      <Headline>The Coldest Sunset</Headline>
      <Intro>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus
        quia, nulla! Maiores et perferendis eaque, exercitationem praesentium
        nihil.
      </Intro>
    </Header>
    <Body>
      <Tag>#photography</Tag>
      <Tag>#travel</Tag>
      <Tag>#winter</Tag>
    </Body>
  </Container>
);

export default Card;
