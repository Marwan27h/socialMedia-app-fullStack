import React from "react"
import "./about.scss"
import { Link } from "react-router-dom"
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined"

const Login = () => {
    return (
        <div className="about">
            <div className="card">
                <div className="about-left">
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

                    <span>Go to home page?</span>
                    <Link to="/">
                        <button><HomeOutlinedIcon/></button>
                    </Link>
                    <span>&copy; 2023 Developer Marwan Alhatab</span>
                </div>
                <div className="about-right">
                    <h1>About Us</h1>

                    <p>
                        We are a team of developers working on creating
                        innovative web applications that solve real-world
                        problems. Our goal is to make a positive impact on
                        society by using technology to create useful and
                        accessible tools for everyone.
                    </p>
                    <hr />
                    <p>Our Team</p>
                    <ul>
                        <li>Marwan Alhatab - CEO</li>
                        <li>Jane Smith - COO</li>
                        <li>Bob Johnson - CTO</li>
                    </ul>
                    <span>
                        If you have any questions or feedback, please don't
                        hesitate to contact us.
                    </span>
                    <Link to="/contact">
                        <button>Contact us </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Login
