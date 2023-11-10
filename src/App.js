import { Route, Routes } from "react-router";
import GlobalStyle from "./styles/globalStyle";
import Landing from "./pages/Landing";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

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
      </Routes>
    </>
  );
};

export default App;
