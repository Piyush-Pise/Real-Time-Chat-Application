import "../css/side-bar.css";
import SideBarHeader from "./SideBarHeader";
import SideBarSearchBar from "./SideBarSearchBar";
import ChatElementCard from "./ChatElementCard";

function SideBar(prop) {

  const ChatList = prop.onlineUsers.map((obj, index) => (
    <ChatElementCard
      key={index}
      // name={obj.name}
      name={obj.name + (obj.name === prop.userName ? " (you)" : "")}
      // url={obj.url}
      url={"/avatar.svg"}
      // newMsg={obj.newMsg}
      newMsg={0}
      // time={obj.time}
      time={"11:48"}
      // online={obj.online}
      online={true}
      OnChatCardClick={prop.OnChatCardClick}
      index={index}
    />
  ));

  return (
    <div className="sidebar-container">
      <SideBarHeader userName={prop.userName} />
      <SideBarSearchBar />
      <div className="chat-list-container">{ChatList.length > 0 ? ChatList : "No onlines user"}</div>
    </div>
  );
}

export default SideBar;
