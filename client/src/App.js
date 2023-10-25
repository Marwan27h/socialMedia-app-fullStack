import Login from "./pages/login/Login"
import Register from "./pages/register/Register"
import {
    createBrowserRouter,
    RouterProvider,
    Outlet,
    Navigate,
    useLocation,
} from "react-router-dom"
import Navbar from "./components/navbar/Navbar"
import LeftBar from "./components/leftBar/LeftBar"
import RightBar from "./components/rightBar/RightBar"
import Home from "./pages/home/Home"
import Profile from "./pages/profile/Profile"
import About from "./pages/about/About"
import ContactUs from "./pages/contact/ContactUs"
import ShareEvent from "./pages/event/Event"
import ProfileImages from "./pages/profile/components/ProfileImages"
import "./style.scss"
import { React, useContext } from "react"
import { DarkModeContext } from "./context/darkModeContext"
import { AuthContext } from "./context/authContext"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

function App() {
    const { currentUser } = useContext(AuthContext)
    const { darkMode } = useContext(DarkModeContext)

    const queryClient = new QueryClient()
const Layout = () => {
    const location = useLocation();
    
    return (
        <QueryClientProvider client={queryClient}>
            <div className={`theme-${darkMode ? "dark" : "light"}`}>
                <Navbar />
                <div style={{ display: "flex" }}>
                    <LeftBar />
                    <div
                        className={`theme-${darkMode ? "dark" : "light"}`}
                        style={{
                            flex: 6.7,
                            backgroundColor: darkMode ? "#333" : "#f6f3f3",
                            minHeight: "100vh",
                        }}
                    >
                        {location.pathname === "/event" ? (
                            <ShareEvent />
                        ) : (
                            <Outlet />
                        )}
                    </div>
                    <RightBar />
                </div>
            </div>
        </QueryClientProvider>
    )
};

    const ProtectedRoute = ({ children }) => {
        if (currentUser === null) {
            return <Navigate to="/login" />
        }

        return children
    }

    const router = createBrowserRouter([
        {
            path: "/",
            element: (
                <ProtectedRoute>
                    <Layout />
                </ProtectedRoute>
            ),
            children: [
                {
                    path: "/",
                    element: <Home />,
                },
                {
                    path: "/profile/:id",
                    element: <Profile />,
                },
            ],
        },
        {
            path: "/event",
            element: (
                <ProtectedRoute>
                    <Layout>
                        <ShareEvent />
                    </Layout>
                </ProtectedRoute>
            ),
        },
        {
            path: "/login",
            element: <Login />,
        },
        {
            path: "/register",
            element: <Register />,
        },
        {
            path: "/gallery",
            element: <ProfileImages />,
        },
        {
            path: "/contact",
            element: <ContactUs />,
        },
        {
            path: "/about",
            element: <About />,
        },
    ])

    return (
        <div>
            <RouterProvider router={router} />
        </div>
    )
}

export default App
