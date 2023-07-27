import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Layout from "./components/layout";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./utilities/theme";
import Login from "./pages/login";
import Signup from "./pages/signup";
import AuthProvider from "./contexts/useAuth";
import ProtectedRoute from "./contexts/ProtectedRoute";
import PublicRoute from "./contexts/PublicRoute";
import NotFound from "./pages/notfound";
import Post from "./pages/post";

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route
                index
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/post/:id"
                element={
                  <ProtectedRoute>
                    <Post />
                  </ProtectedRoute>
                }
              />
              <Route
                path="login"
                element={
                  <PublicRoute>
                    <Login />
                  </PublicRoute>
                }
              />
              <Route
                path="signup"
                element={
                  <PublicRoute>
                    <Signup />
                  </PublicRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <CssBaseline />
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
