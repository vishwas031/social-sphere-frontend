import "./messenger.css";
import Conversation from "../../components/conversations/Conversation";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { io } from "socket.io-client";
import Navbar from "scenes/navbar";

export default function Messenger() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  const token = useSelector((state) => state.token);
  const user = useSelector((state)=> state.user);
  // it will help us the scroll the conversation/message section scroll automatically
  const scrollRef = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.member.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(
       user.friends.filter((f) => users.some((u) => u.userId === f._id))
      );
    });
  }, [user]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/conversations/${user._id}`,{
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user._id,token]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/messages/${currentChat?._id}`,{
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat,token]);

  const handleSubmit = async (e) => {
    // to prevent refreshing the page
    e.preventDefault();
    const message = {
      conversationId: currentChat._id,
      sender: user._id,
      text: newMessage,
    };

    const receiverId = currentChat.member.find(
      (member) => member !== user._id
    );

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId: receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/messages`, {
        // Request body data
        message: message,
      });
      // add my new message in the measseges array, keeping all the previous values same
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <Navbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            {/* <input placeholder="Search for friends" className="chatMenuInput" /> */}
            {conversations.map((c) => (
              <div onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={user} key={c._id}/>
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m) => (
                    <div ref={scrollRef}>
                      <Message message={m} own={m.sender === user._id} key={m._id}/>
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat.
              </span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            {onlineUsers.length ? 
            <>
              <span className="leftTitle">Online</span>
              <ChatOnline
                onlineUsers={onlineUsers}
                currentId={user._id}
                setCurrentChat={setCurrentChat}
              />
            </>
          :
          <span className="leftTitle">No one is online</span>
          }
          </div>
        </div>
      </div>
    </>
  );
}