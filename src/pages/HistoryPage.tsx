import { useEffect } from "react";
import { Paper, Typography } from "@mui/material";
import { useFeedbackStore } from "../store/feedbackStore";
import { FeedbackHistory } from "../components/FeedbackHistory/FeedbackHistory";  

const HistoryPage = () => {
  const fetchList = useFeedbackStore((state) => state.fetchList);

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  return (
    <Paper sx={{p: 3}}>
      <Typography variant="h5" component="h1" gutterBottom>
        История отправленых форм
      </Typography>
      <FeedbackHistory />
    </Paper>
  );
};

export default HistoryPage;