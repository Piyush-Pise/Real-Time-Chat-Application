import { useNavigate } from "react-router-dom";
import "../css/side-bar-header.css";
import useSocket from "../custom hooks/useSocket";
import { clearToken } from "../custom hooks/token";
import { clearSocket } from "../socket.io/socket";

function SideBarHeader(prop) {
  const socket = useSocket();
  
  const navigate = useNavigate();
  return (
    <div className="side-bar-header-container">
      <div className="your-profile-picture"></div>
      <div className="your-profile-name">{prop.userName}</div>
      <span
        className="material-symbols-outlined options"
        onClick={() => {
          clearToken();
          // sessionStorage.clear('token');
          // localStorage.clear("token");
          socket.disconnect();
          clearSocket();
          navigate("/login");
        }}
      >
        logout
      </span>
      {/* </select> */}
    </div>
  );
}

export default SideBarHeader;
