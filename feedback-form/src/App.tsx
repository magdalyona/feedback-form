import { BrowserRouter, Routes, Route, Link  } from "react-router-dom";
import { AppBar, Box, Container, CssBaseline, Toolbar, Typography, Button } from "@mui/material";
import MainPage from "./pages/MainPage";    
import HistoryPage from "./pages/HistoryPage";  

//роутинг и верхнее меню
const App = () => {
  return (
    <BrowserRouter> 
    <CssBaseline />
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{flexGrow: 1}}>
          Форма обратной связи
        </Typography>
  
        <Button color="inherit" component={Link} to="/">
          История
        </Button>
  
      </Toolbar>
    </AppBar>
  
    <Box component="main" sx={{py: 4}}>
      <Container maxWidth="md">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/history" element={<HistoryPage />} />
        </Routes>
      </Container>
    </Box>
    </BrowserRouter>
  );
}

export default App;

