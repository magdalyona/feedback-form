import { useMemo } from "react";
import { HashRouter, Routes, Route, Link } from "react-router-dom";
import {
  AppBar,
  Box,
  Container,
  CssBaseline,
  Toolbar,
  Typography,
  Button,
  ThemeProvider,
  createTheme,
  useMediaQuery,
} from "@mui/material";
import MainPage from "./pages/MainPage";
import HistoryPage from "./pages/HistoryPage";

//роутинг и верхнее меню
const App = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <HashRouter>
        <CssBaseline />
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Форма обратной связи
            </Typography>

            <Button color="inherit" component={Link} to="/">
              Форма
            </Button>
            <Button color="inherit" component={Link} to="/history">
              История
            </Button>
          </Toolbar>
        </AppBar>

        <Box component="main" sx={{ py: 4 }}>
          <Container maxWidth="md">
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/history" element={<HistoryPage />} />
            </Routes>
          </Container>
        </Box>
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;

