import { useEffect } from "react";
import { Paper, Typography, Box } from "@mui/material";
import { useFeedbackStore } from "../store/feedbackStore";
import { FeedbackHistory } from "../components/FeedbackHistory/FeedbackHistory";
import { Loader } from "../components/common/Loader";
import { ErrorMessage } from "../components/common/ErrorMessage";

const HistoryPage = () => {
  const fetchList = useFeedbackStore((state) => state.fetchList);
  const isLoading = useFeedbackStore((state) => state.isLoading);
  const error = useFeedbackStore((state) => state.error);

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" component="h1" gutterBottom>
        История отправленых форм
      </Typography>

      <Box mt={2}>
        {isLoading && <Loader />}
        {error && (
          <Box mb={2}>
            <ErrorMessage message={error} onRetry={fetchList} />
          </Box>
        )}
        {!isLoading && !error && <FeedbackHistory />}
      </Box>
    </Paper>
  );
};

export default HistoryPage;