import { useEffect, useRef, useState } from "react";
import "../css/chat-body.css";
import Message from "./Message";
import useSocket from "../custom hooks/useSocket";

function ChatBody(prop) {
  console.log("ChatBody rendered");
  const socket = useSocket();
  const textareaRef = useRef(null);
  const chatSectionRef = useRef(null);

  useEffect(() => {
    const newChild = chatSectionRef.current.lastChild;
    newChild.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  }, [chatSectionRef.current?.children.length]);

  // const [message, setMessage] = useState("");
  const [messageStack, setMessageStack] = useState([
    { message: "hELLO wORLD", isThisMsgMine: true },
  ]);

  function adjustHeight() {
    const textarea = textareaRef.current;
    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 250)}px`;
  }

  useEffect(() => {
    socket.on("message from server", (data) => {
      console.log("message from server", data);
      setMessageStack((messageStack) => {
        return [
          ...messageStack,
          { message: data.message, time: data.time, isThisMsgMine: false },
        ];
      });
      console.log(messageStack);
    });

    return () => {
      socket.off("message from server");
    };
  }, [messageStack, socket]);

  let messageStackArray = messageStack.map((obj, index) => {
    return (
      <Message
        key={index}
        message={obj.message}
        isThisMsgMine={obj.isThisMsgMine}
        time={obj.time}
      />
    );
  });

  function getTime() {
    const date = new Date();
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const amOrPm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;

    return `${hours.toString().padStart(2, "0")}:${minutes} ${amOrPm}`;
  }

  const HandleMessageSend = () => {
    console.log("message sent");

    setMessageStack([
      ...messageStack,
      {
        message: textareaRef.current.value,
        isThisMsgMine: true,
        time: getTime(),
      },
    ]);
    socket.emit("message form socket", {
      message: textareaRef.current.value,
      toSocketId: prop.activeRoom.socketId,
      fromSocketId: socket.id,
      time: getTime(),
    });
    textareaRef.current.value = "";
  };

  return (
    <div className="chat-body-container">
      <div className="chat-body-section" ref={chatSectionRef}>
        {messageStackArray}
      </div>
      <div className="chat-input">
        <textarea
          ref={textareaRef}
          // value={message}
          className="roboto-regular"
          placeholder="Type a message here.."
          onInput={adjustHeight}
          // onKeyPress={(e) => {
          //   if (e.key === 'Enter') {
          //     HandleMessageSend();
          //   }
          // }}
        ></textarea>
        <button className="send" onClick={HandleMessageSend}>
          {/* <span class="material-symbols-outlined">send</span> */}
        </button>
      </div>
    </div>
  );
}

export default ChatBody;
