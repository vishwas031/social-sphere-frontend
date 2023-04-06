import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import Form from "./Form";

const LoginPage = () => {
    const theme = useTheme();
    const isNonMobileScreeens = useMediaQuery("(min-width: 1000px");
    return (
        <Box>
            <Box width="100%" background={theme.palette.background.alt} p="1rem 6%" textAlign="center">
            <Typography
                fontWeight="bold"
                fontSize="32px"
                color="primary"
            >
            SocialSphere
            </Typography>
            </Box>
            <Box
                width={isNonMobileScreeens ? "50%" : "93%"}
                p="2rem"
                m="2rem auto"
                borderRadius="1.5rem"
                backgroundColor={theme.palette.background.alt}
            >
                <Typography fontWeight="500" variant="h5" sx={{mb:"1.5rem"}}>
                    Welcome to SocialSphere, where the world connect with each other...
                </Typography>
                <Form/>
            </Box>
        </Box>

    );
};

export default LoginPage;