import theme from "../theme";
import { Box, Typography, Card, Button } from "@mui/material";
import { styled } from "@mui/system";

const StyledCard = styled(Card)({
  width: 200,
  maxWidth: 200,
  height: 360,
  padding: theme.spacing(2),
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  gap: theme.spacing(2),
});

const ImageContainer = styled(Box)({
  width: "100%",
  height: 150,
  display: "flex",
  justifyContent: "center",
});

const CardTitle = styled(Typography)({
  textAlign: "center",
});

const Image = styled("img")({
  maxHeight: "100%",
  maxWidth: "100%",
});

const Description = styled(Typography)({
  fontStyle: "italic",
});

const StyledButton = styled(Button)({
  borderRadius: 20,
});

function App({ title, picture, description }) {
  return (
    <StyledCard>
      <CardTitle variant="h5">{title}</CardTitle>
      <ImageContainer>
        <Image src={picture} alt="profile" />
      </ImageContainer>
      <Description variant="p">{description}</Description>
      <StyledButton color="primary" variant="contained">
        Subscribe
      </StyledButton>
    </StyledCard>
  );
}

export default App;
