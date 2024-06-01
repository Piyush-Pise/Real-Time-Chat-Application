import ChatSection from "../components/ChatSection";
import SideBar from "../components/SideBar";
import { useState, useEffect } from "react";
import { links } from "../links";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getToken } from "../custom hooks/token";
import useSocket from "../custom hooks/useSocket";

function Main() {
  const navigate = useNavigate();
  const [activeRoom, setActiveRoom] = useState({});
  const [activeSessions, setActiveSessions] = useState([]);
  const [userName, setUserName] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);

  async function VerifyToken() {
    const token = getToken();
    if (!token) {
      console.log("Token verification failed");
      navigate("/login");
      return false;
    }
    try {
      axios.defaults.headers.common["x-auth-token"] = token;
      const res = await axios.get(links.VerifyTokenURI);
      // console.log(res.status);
      if (res.status !== 200) {
        console.log("Token verification failed");
        navigate("/login");
        return false;
      }
      console.log("Token verification successful");
      setUserName(res.data.msg);
      return true;
    } catch (error) {
      console.log("Error occurred while verifying token:", error);
      navigate("/login");
      return false;
    }
  }

  useEffect(() => {
    VerifyToken();
  }, []);

  const socket = useSocket();

  useEffect(() => {
    socket.on("online users", (Data) => {
      setOnlineUsers(Data);
    });

    return () => {
      socket.off("online users");
    };
  }, [socket]);

  function OnChatCardClick(index) {
    setActiveRoom(onlineUsers[index]);
  }

  return (
    <>
      <SideBar
        userName={userName}
        onlineUsers={onlineUsers}
        activeRoom={activeRoom}
        OnChatCardClick={OnChatCardClick}
      />
      <ChatSection activeRoom={activeRoom} />
    </>
  );
}

export default Main;
