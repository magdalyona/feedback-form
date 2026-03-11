import { Box, CircularProgress } from '@mui/material';

// простой переиспользуемый лоадер по центру контейнера
export const Loader = () => (
  <Box display="flex" justifyContent="center" alignItems="center" py={2}>
    <CircularProgress />
  </Box>
);

