import axios from "axios";
import { useEffect, useState } from "react";
import "./conversation.css";
import { useSelector } from "react-redux";


export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);
  const token = useSelector((state) => state.token);


  useEffect(() => {
    const friendId = conversation.member.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await axios(`${process.env.REACT_APP_BACKEND_URL}/users/${friendId}`,{
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation, token]);

  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src={user?.picturePath}
        alt=""
      />
      <span className="conversationName">{user?.firstName}</span>
    </div>
  );
}