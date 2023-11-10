import { Route, Routes } from "react-router";
import GlobalStyle from "./styles/globalStyle";
import Landing from "./pages/Landing";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import VideoChat from './pages/VideoChat';

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
      </Routes>
    </>
  );
};

export default App;
