import { useState } from "react";
import {
    Box,
    IconButton,
    InputBase,
    Typography,
    Select,
    MenuItem,
    FormControl,
    useMediaQuery,
    useTheme
} from "@mui/material"
import {
    Search,
    Message,
    DarkMode,
    LightMode,
    Notifications,
    Help,
    Menu,
    Close
} from "@mui/icons-material"
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";

const Navbar = () => {
    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state)=> state.user);
    const isNonMobileScreeens = useMediaQuery('(min-width: 1000px)');

    // this will go to our theme.js file and configure the mui components according to that file
    const theme = useTheme();
    const neutralLight = theme.palette.neutral.light;
    const dark = theme.palette.neutral.dark;
    const background = theme.palette.background.default;
    const primaryLight = theme.palette.primary.light;
    const alt = theme.palette.background.alt;

    const fullName = `${user.firstName} ${user.lastName}`;

    return <FlexBetween padding="1rem 6%" backgroundColor={alt} position="fixed" width="100%" zIndex="10">
        <FlexBetween gap="1.75rem">
            <Typography
                fontWeight="bold"
                // clamp is a function in CSS to set the minimum/maximum size of the font and the preferred size according to the screen size it adjusts automatically
                fontSize="clamp(1rem,2rem,2.25rem)"
                color="primary"
                onClick={()=> navigate("/home")}
                // to add some custom css properties to materialUI components we use sx
                sx={{
                    "&:hover" : {
                        color: primaryLight,
                        cursor: "pointer",
                    }
                }}
            >
                SocialSphere
            </Typography>
            {isNonMobileScreeens && (
                <FlexBetween 
                    backgroundColor={neutralLight} 
                    borderRadius="9px" 
                    gap="3rem" 
                    padding="0.1rem 1.5rem"
                >
                    <InputBase placeholder="Search..."/>
                    <IconButton>
                        <Search/>
                    </IconButton>
                </FlexBetween>
            )}
        </FlexBetween>

        {/* DESKTOP NAV */}
        {isNonMobileScreeens ? (
            <FlexBetween gap="2rem">
                {/* this button will change the theme using the redux state*/}
                <IconButton onClick={()=> dispatch(setMode())}>
                    {theme.palette.mode === "dark" ? (
                        <DarkMode sx={{fontSize: "25px"}}/>
                    ) : (
                        <LightMode sx={{ color: dark, fontSize: "25px"}}/>
                    )}
                </IconButton>
                <Message sx={{fontSize: "25px"}}/>
                <Notifications sx={{fontSize: "25px"}}/>
                <Help sx={{fontSize: "25px"}}/>
                {/* this will be for our drop from the top right to see the users profile */}
                <FormControl variant="standard" value={fullName}>
                    <Select 
                        value= {fullName}
                        sx={{
                            backgroundColor: neutralLight,
                            width: "150px",
                            borderRadius: "0.25rem",
                            p: "0.25rem 1rem",
                            // to change the CSS of a particular materialUI svg
                            "& .MuiSvgIcon-root": {
                                pr: "0.25rem",
                                width: "3rem"
                            },
                            "& .MuiSelect-select:focus": {
                                backgroundColor: neutralLight
                            }
                        }}
                        input={<InputBase/>}
                    >
                        <MenuItem value={fullName}>
                            <Typography>{fullName}</Typography>
                        </MenuItem>
                        <MenuItem onClick={()=> dispatch(setLogout())}>Log Out</MenuItem>
                    </Select>
                </FormControl>
            </FlexBetween>
        ) : (
            <IconButton
                onClick={()=> setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
                <Menu/>
            </IconButton>
        )}

        {/* MOBILE NAV */}
        {!isNonMobileScreeens && isMobileMenuToggled && (
            <Box
                position="fixed"
                right="0"
                bottom="0"
                height="100%"
                zIndex="10"
                maxWidth="500px"
                minWidth="300px"
                backgroundColor={background}
            >
                {/* close icon */}
                <Box display="flex" justifyContent="flex-end" p="1rem">
                    <IconButton
                        onClick={()=> setIsMobileMenuToggled(!isMobileMenuToggled)}
                    >
                        <Close/>
                    </IconButton>
                </Box>

                {/* Menu Items */}
                <FlexBetween 
                    display="flex" 
                    flexDirection="column" 
                    alignItems="center" 
                    gap="2rem">
                {/* this button will change the theme using the redux state*/}
                <IconButton 
                    onClick={()=> dispatch(setMode())}
                    sx={{fontSize: "25px"}}
                >
                    {theme.palette.mode === "dark" ? (
                        <DarkMode sx={{fontSize: "25px"}}/>
                    ) : (
                        <LightMode sx={{ color: dark, fontSize: "25px"}}/>
                    )}
                </IconButton>
                <Message sx={{fontSize: "25px"}}/>
                <Notifications sx={{fontSize: "25px"}}/>
                <Help sx={{fontSize: "25px"}}/>
                {/* this will be for our drop from the top right to see the users profile */}
                <FormControl variant="standard" value={fullName}>
                    <Select 
                        value= {fullName}
                        sx={{
                            backgroundColor: neutralLight,
                            width: "150px",
                            borderRadius: "0.25rem",
                            p: "0.25rem 1rem",
                            // to change the CSS of a particular materialUI svg
                            "& .MuiSvgIcon-root": {
                                pr: "0.25rem",
                                width: "3rem"
                            },
                            "& .MuiSelect-select:focus": {
                                backgroundColor: neutralLight
                            }
                        }}
                        input={<InputBase/>}
                    >
                        <MenuItem value={fullName}>
                            <Typography>{fullName}</Typography>
                        </MenuItem>
                        <MenuItem onClick={()=> dispatch(setLogout())}>
                            Log Out
                        </MenuItem>
                    </Select>
                </FormControl>
            </FlexBetween>
            </Box>
        )}
    </FlexBetween>;

};

export default Navbar;