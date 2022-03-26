import theme from "./theme";
import { ThemeProvider } from "@mui/material/styles";
import {
  AppBar,
  Box,
  Typography,
  Container, 
} from "@mui/material";
import { styled } from "@mui/system";
import flowerPicture from "./assets/flowerpic.jpg";
import flowerPicture2 from "./assets/flowerpic2.jpg";
import PatreeonCard from "./components/PatreeonCard"

const StyledTitle = styled(Typography)({
  marginLeft: "1rem",
  marginRight: "1rem",
});

const MainContainer = styled(Box)({
  height: "100vh",
});

const StyledContainer = styled(Container)({
  marginTop: theme.spacing(6),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(4),
});

const StyledCardContainer = styled(Box)({
  display: "flex",
  gap: theme.spacing(3),
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <MainContainer>
        <AppBar color="primary">
          <StyledTitle
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            Patreeon
          </StyledTitle>
        </AppBar>

        <StyledContainer maxWidth="xl">
          <Typography variant="h1">Welcome to Patreeon</Typography>
          <StyledCardContainer>
            <PatreeonCard
              picture={flowerPicture}
              title="Tibo mimi"
              description="description voila voila hello"
            />
            <PatreeonCard
              picture={flowerPicture2}
              title="Tibo mimi"
              description="description voila voila hello reee errrr re reeee"
            />
          </StyledCardContainer>
        </StyledContainer>
      </MainContainer>
    </ThemeProvider>
  );
}

export default App;
