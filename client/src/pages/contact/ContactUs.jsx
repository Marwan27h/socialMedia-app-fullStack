import { React, useState } from "react"
import { Link } from "react-router-dom"
import "./contactUs.scss"
import { makeRequest } from "../../axios"
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined"

const ContactUs = () => {
    const [inputs, setInputs] = useState({
        username: "",
        email: "",
        subject: "",
        message: "",
    })
    const [successMessage, setSuccessMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [formIncomplete, setFormIncomplete] = useState(false)

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!isFormValid()) {
            setFormIncomplete(true)
            return
        }

        try {
            await makeRequest.post("/contact", inputs)
            setSuccessMessage("Your message has been sent successfully.")
            setErrorMessage("")
            setFormIncomplete(false)
            setInputs({
                username: "",
                email: "",
                subject: "",
                message: "",
            })

            setTimeout(() => {
                setSuccessMessage("")
            }, 3000)
        } catch (err) {
            setSuccessMessage("")
            setErrorMessage("Failed to send message. Please try again later.")
        }
    }

    const isFormValid = () => {
        return (
            inputs.username !== "" &&
            inputs.email !== "" &&
            inputs.subject !== "" &&
            inputs.message !== ""
        )
    }

    return (
        <div className="contact-us">
            <div className="card">
                <div className="left">
                    <h1>Welcome </h1>
                    <p>to Our Support Center</p>
                    <p>
                        Have a question, concern, or feedback? Our support team
                        is here to assist you. Fill out the form below, and
                        we'll get back to you as soon as possible.
                    </p>
                    <span>Go to home page? </span>
                    <Link to="/">
                        <button>
                            <HomeOutlinedIcon />
                        </button>
                    </Link>
                </div>
                <div className="right">
                    <h1>Contact Us</h1>
                    <form>
                        <input
                            type="text"
                            placeholder="Your Username"
                            name="username"
                            value={inputs.username}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="email"
                            placeholder="Your Email"
                            name="email"
                            value={inputs.email}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Subject"
                            name="subject"
                            value={inputs.subject}
                            onChange={handleChange}
                            required
                        />
                        <textarea
                            placeholder="Your Message"
                            name="message"
                            value={inputs.message}
                            onChange={handleChange}
                            required
                        />
                        {errorMessage && (
                            <div className="error">{errorMessage}</div>
                        )}
                        {formIncomplete && (
                            <div className="error">
                                Please fill out all fields.
                            </div>
                        )}
                        {successMessage && (
                            <div className="success">{successMessage}</div>
                        )}
                        <button onClick={handleSubmit}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ContactUs
