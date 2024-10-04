import AccountEdit from "./Components/AccountEdit";
import Home from "./Components/Home";
import Login from "./Components/Login";
import ProtectedRoute from "./Components/ProtectedRoute";
import Register from "./Components/Register";
import VideoCall from "./Components/VideoCall";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Login} />
        <Route path="/login" Component={Login} />
        <Route path="/register" Component={Register} />
        <Route
          path="/home"
          Component={() => (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          )}
        />
      </Routes>
    </BrowserRouter>
  );
  // return <Home />;

  // return <AccountEdit />;
}

export default App;
