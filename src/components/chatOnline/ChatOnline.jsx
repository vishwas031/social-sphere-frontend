import axios from "axios";

import "./chatOnline.css";

const ChatOnline= ({ onlineUsers, currentId, setCurrentChat }) => {
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
    <div className="chatOnline">
      {onlineUsers.map((o) => (
        <div className="chatOnlineFriend" key={o._id} onClick={()=>handleClick(o)}>
          <div className="chatOnlineImgContainer">
            <img
              className="chatOnlineImg"
              src={o?.picturePath}
              alt=""
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{o?.firstName}</span>
        </div>
      ))}
    </div>
  );
}

export default ChatOnline;