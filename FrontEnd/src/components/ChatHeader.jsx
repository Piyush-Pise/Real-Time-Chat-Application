import "../css/chat-header.css";

function ChatHeader(prop) {
  return (
    <>
      <div className="chat-header-container">
        <div className="profile-picture"></div>
        <div className="profile-name">{prop.activeRoom.name}</div>
      </div>
    </>
  );
}

export default ChatHeader;
