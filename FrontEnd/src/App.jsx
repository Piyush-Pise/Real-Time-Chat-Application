import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Temporary from "./pages/Temporary";

function App() {

  return (
    <>
      <Router>
        <Routes>
          {/* <Route path="/temporary" element={<Temporary />} /> */}
          <Route path="/chat" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* <Route path="chat/:id" element={<Main />} /> */}
          <Route path="*" element={<Navigate to="/chat" replace />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
