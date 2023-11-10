import { Route, Routes } from "react-router";
import GlobalStyle from "./styles/globalStyle";
import Landing from "./pages/Landing";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import VideoChat from "./pages/VideoChat";
import Profile from "./pages/Profile";
import Recruit from "./pages/Recruit";
import Ask from "./pages/Ask";

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route
          path="/"
          element={<Landing />}
        />
        <Route
          path="/signin"
          element={<SignIn />}
        />
        <Route
          path="/signup"
          element={<SignUp />}
        />
        <Route
          path="/videochat"
          element={<VideoChat />}
        />
        <Route
          path="/profile"
          element={<Profile />}
        />
        <Route
          path="/recruit"
          element={<Recruit />}
        />
        <Route
          path="/ask"
          element={<Ask />}
        />
      </Routes>
    </>
  );
};

export default App;
