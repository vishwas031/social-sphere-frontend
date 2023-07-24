import { Box } from "@mui/material";
import { styled } from "@mui/system";
import { css } from '@emotion/react';

// const WidgetWrapper = styled(Box)(({ theme }) => ({
//   padding: "1.5rem 1.5rem 0.75rem 1.5rem",
//   backgroundColor: theme.palette.background.alt,
//   borderRadius: "0.75rem",
// }));

const WidgetWrapper = styled(Box)(({ theme }) => css`
/* background-image: url('https://images.unsplash.com/photo-1519681393784-d120267933ba?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1124&q=100');
    background-position: center; */
  margin: 0.5rem;
  padding: 1.5rem 1.5rem 0.75rem 1.5rem;
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  background-color: ${theme.palette.background.card};
  border-radius: 0.75rem;
  border: 1px solid ${theme.palette.background.card};
`);

export default WidgetWrapper;