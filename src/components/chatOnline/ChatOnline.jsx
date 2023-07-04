import axios from "axios";
import { Box, useTheme, Divider } from "@mui/material";
import "./chatOnline.css";

const ChatOnline= ({ onlineUsers, currentId, setCurrentChat }) => {
  
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  
  const handleClick = async (user) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/conversations/find/${currentId}/${user._id}`
      );
      setCurrentChat(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box className="chatOnline">
      {onlineUsers.map((o) => (
        <>
        <Divider/>
        <Typography
        variant="h4"
        color={dark}
        fontWeight="500"
        padding={1}
        sx={{
          "&:hover": {
            color: palette.primary.light,
            cursor: "pointer",
          },
        }} 
        className="chatOnlineFriend" 
        key={o._id} 
        onClick={()=>handleClick(o)}
        >
          <div className="chatOnlineImgContainer">
            <img
              className="chatOnlineImg"
              src={o?.picturePath}
              alt=""
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{o?.firstName}</span>
        </Typography>
        <Divider/>
        </>
      ))}
    </Box>
  );
}

export default ChatOnline;