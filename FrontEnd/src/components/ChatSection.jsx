import ChatHeader from "./ChatHeader";
import ChatBody from "./ChatBody";
import "../css/chat-section.css";
function ChatSection(prop) {
  return (
    <>
      <div className="chat-section-container">
        <ChatHeader activeRoom={prop.activeRoom} />
        <ChatBody activeRoom={prop.activeRoom}/>
      </div>
    </>
  );
}

export default ChatSection;
