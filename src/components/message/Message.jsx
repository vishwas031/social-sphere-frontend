import "./message.css";
import { format } from "timeago.js";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Message({ conversation, message, own }) {
  const [receiver, setReceiver] = useState(null);
  const sender = useSelector((state)=> state.user);
  const token = useSelector((state) => state.token);

  useEffect(() => {
    const friendId = conversation.member.find((m) => m !== sender._id);

    const getUser = async () => {
      try {
        const res = await axios(`${process.env.REACT_APP_BACKEND_URL}/users/${friendId}`,{
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setReceiver(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [conversation, token]);

  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src={own? sender.picturePath : receiver?.picturePath}
          alt=""
        />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}