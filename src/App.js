import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import ErrorPage from "./components/Error";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import Messenger from "scenes/messenger/Messenger";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "theme";
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

function App() {
  // here we are grabbing the mode that is stored in the redux store
  const mode = useSelector((state)=> state.mode);
  const theme = useMemo(()=> createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="App">
      <BrowserRouter>
      <ThemeProvider theme={theme}>
        {/* this helps to reset the CSS in materialUI */}
        <CssBaseline/>
        <ToastContainer />
        <Routes>
        <Route path="/" element={<LoginPage />} />
            <Route path="/" 
              element={isAuth ? <HomePage /> : <Navigate to="/" />}
              errorElement= {<ErrorPage />}
            />
            <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate to="/" />}
              errorElement= {<ErrorPage />}
            />
            <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
              errorElement= {<ErrorPage />}
            />
            <Route 
            path="/messenger"
            element = {isAuth ? <Messenger /> : <Navigate to="/" />}
            errorElement= {<ErrorPage />}
            />
          </Routes>
      </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
