import React, { useState } from "react"
import { Link } from "react-router-dom"
import "./register.scss"
import axios from "axios"

const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

const Register = () => {
    const [inputs, setInputs] = useState({
        username: "",
        email: "",
        password: "",
        name: "",
    })
    const [successMessage, setSuccessMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleClick = async (e) => {
        e.preventDefault()

        if (
            inputs.username.trim() === "" ||
            inputs.email.trim() === "" ||
            inputs.password.trim() === "" ||
            inputs.name.trim() === ""
        ) {
            setErrorMessage("All Fields are required ...")
            return
        }

        if (!emailPattern.test(inputs.email)) {
            setErrorMessage("Invalid email address.")
            return
        }

        try {
            await axios.post("http://localhost:3006/api/auth/register", inputs)
            setSuccessMessage("User has been registered successfully.")
            setErrorMessage("")
        } catch (err) {
            setSuccessMessage("")
            setErrorMessage(err.response.data)
        }
    }

    return (
        <div className="register">
            <div className="card">
                <div className="left">
                    <h1>InterActify.</h1>
                    <p>
                        Discover a wealth of opportunities to express your
                        creativity, passions, and opinions through our
                        user-friendly interface. From sharing photos and videos
                        to engaging in lively discussions, our social media
                        website empowers you to showcase your unique personality
                        and engage with content that resonates with you. Connect
                        with others who share your interests, join communities
                        centered around your hobbies, or engage in conversations
                        that expand your horizons.
                    </p>
                    <span>Do you have an account?</span>
                    <Link to="/login">
                        <button>Login</button>
                    </Link>
                </div>
                <div className="right">
                    <h1>Register</h1>
                    <form>
                        <input
                            type="text"
                            placeholder="Username"
                            name="username"
                            onChange={handleChange}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            onChange={handleChange}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            placeholder="Name"
                            name="name"
                            onChange={handleChange}
                        />
                        {errorMessage && (
                            <div className="error">{errorMessage}</div>
                        )}
                        {successMessage && (
                            <div className="success">{successMessage}</div>
                        )}
                        <button onClick={handleClick}>Register</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register
