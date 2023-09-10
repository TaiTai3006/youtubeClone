import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";
import HomeScreen from "./screens/homeScreen/HomeScreen";
import { Container } from "react-bootstrap";
import LoginScreen from "./screens/loginScreen/LoginScreen";
import "./_app.scss";
import { useEffect, useState } from "react";

import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import WatchScreen from "./screens/watchScreen/WatchScreen";
import SearchScreen from "./screens/searchScreen/SearchScreen";
import SubscriptionsScreen from "./screens/subscriptionsScreen/SubscriptionsScreen";
import ChannelScreen from "./screens/channelScreen/ChannelScreen";
import LikedVideoScreen from "./screens/likedVideoScreen/LikedVideoScreen";
const Layout = ({ children }) => {
  const [sidebar, toggleSidebar] = useState(false);
  const handleToggleSidebar = () => {
    toggleSidebar((sidebar) => !sidebar);
  };

  return (
    <div>
      <Header handleToggleSidebar={handleToggleSidebar} />
      <div className="app_container">
        <Sidebar sidebar={sidebar} handleToggleSidebar={handleToggleSidebar} />
        <Container fluid className="app_main">
          {children}
        </Container>
      </div>
    </div>
  );
};

function App() {
  const { accessToken, loading } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  useEffect(() => {
    if (!loading && !accessToken) {
      navigate("/auth");
    }
  }, [accessToken, loading, navigate]);
  return (
    <Routes>
      <Route path="/" exact element={<Layout children={<HomeScreen />} />} />
      <Route path="/auth" element={<LoginScreen />} />
      <Route
        path="/search/:query"
        element={<Layout children={<SearchScreen />} />}
      />
      <Route
        path="/watch/:id"
        element={<Layout children={<WatchScreen />} />}
      />
      <Route
        path="/feed/subscriptions"
        element={<Layout children={<SubscriptionsScreen />} />}
      />
      <Route
        path="/channel/:channelId"
        element={<Layout children={<ChannelScreen />} />}
      />
      <Route
        path="/feed/likedVides"
        element={<Layout children={<LikedVideoScreen />} />}
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
