import { Typography, Paper, Box } from "@mui/material"; 
import { FeedbackForm } from "../components/FeedbackForm/FeedbackForm";

const MainPage = () => (
  <Paper sx={{ p: 3}}>
    <Typography variant="h5" component="h1" gutterBottom>
      Форма обратной связи
    </Typography>
    <Typography variant="body2" color="text.secondary" gutterBottom>
      Заполните форму, и мы свяжемся с вами.
    </Typography>
    <Box mt={2}>
      <FeedbackForm />
    </Box>
  </Paper>
);

export default MainPage;