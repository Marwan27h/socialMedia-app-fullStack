import { React, useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/authContext"
import "./login.scss"

const Login = () => {
    const [inputs, setInputs] = useState({
        username: "",
        password: "",
    })

    const navigate = useNavigate()

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const { login, error } = useContext(AuthContext)

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            await login(inputs)
            const userData = JSON.parse(localStorage.getItem("userData"))

            if (userData && userData.accessToken) {
                
                navigate("/")
            } 
        } catch (err) {
            console.error("Login error:", err)
        }
    }
    return (
        <div className="login">
            <div className="card">
                <div className="left">
                    <h1>Hello World.</h1>
                    <p>
                        Welcome to our dynamic and vibrant social media
                        platform, where connections are made, ideas are shared,
                        and communities thrive. In this fast-paced digital era,
                        our social media website stands as a virtual hub,
                        bringing people from all walks of life together,
                        transcending boundaries and bridging the gaps between
                        individuals across the globe.
                    </p>
                    <span>Don't you have an account?</span>
                    <Link to="/register">
                        <button>Register</button>
                    </Link>
                </div>
                <div className="right">
                    <h1>Login</h1>
                    <form>
                        <input
                            type="text"
                            placeholder="Username"
                            name="username"
                            onChange={handleChange}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={handleChange}
                        />
                        {error && <p>{error}</p>}
                        <button onClick={handleLogin}>Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
