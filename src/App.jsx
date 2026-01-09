import { Routes, Route, Outlet } from "react-router";
import Login from "./components/auth/login.jsx";
import Register from "./components/auth/register.jsx";
import Home from "./components/home/home.jsx";
import Preview from "./components/home/home_components/preview.jsx";
import ChatView from "./components/home/home_components/chat_view.jsx";
import ChatAi from "./components/home/chat_ai/chat_ai.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route index element={<Preview />} />
        <Route path="chats/:id" element={<ChatView />} />
        <Route path="chat-ai" element={<ChatAi />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
