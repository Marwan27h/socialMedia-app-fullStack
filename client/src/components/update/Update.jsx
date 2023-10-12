import { React, useState } from "react"
import { makeRequest } from "../../axios"
import "./update.scss"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import IconButton from "@mui/material/IconButton"
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera"

const mostUsedOptions = {
    work: [
        "Software Engineer",
        "Data Analyst",
        "Graphic Designer",
        "Nurse",
        "Teacher",
        "Marketing Manager",
        "Accountant",
        "Sales Representative",
        "Chef",
        "Other",
    ],
    school: [
        "School",
        "University",
        "Technical College",
        "Online Courses",
        "Other",
    ],
    hobbies: [
        "Reading",
        "Hiking",
        "Cooking",
        "Photography",
        "Traveling",
        "Painting",
        "Gardening",
        "Sports",
        "Music",
        "Other",
    ],
    languages: [
        "English",
        "Arabic",
        "Spanish",
        "French",
        "German",
        "Chinese",
        "Japanese",
        "Russian",
        "Arabic",
        "Portuguese",
        "Other",
    ],
    nationality: [
        "Arab",
        "American",
        "British",
        "Canadian",
        "Indian",
        "Australian",
        "German",
        "French",
        "Japanese",
        "Chinese",
        "Dutch",
        "Other",
    ],
    age: Array.from({ length: 93 }, (_, i) => i + 18),
}

const Update = ({ setOpenUpdate, user }) => {
    const [cover, setCover] = useState(null)
    const [profile, setProfile] = useState(null)
    const [texts, setTexts] = useState({
        name: user.name || "",
        city: user.city || "",
        school: user.school || "",
        work: user.work || "",
        languages_spoken: user.languages_spoken || "",
        hobbies: user.hobbies || "",
        nationality: user.nationality || "",
        age: user.age || null,
    })

    const upload = async (file) => {
        try {
            const formData = new FormData()
            formData.append("file", file)
            const res = await makeRequest.post("/upload", formData)
            return res.data
        } catch (err) {
            console.log(err)
        }
    }
    const handleChange = (e) => {
        const { name, value } = e.target
        setTexts((prev) => ({ ...prev, [name]: value }))
    }

    const queryClient = useQueryClient()

    const mutation = useMutation(
        (user) => {
            return makeRequest.put("/users", user)
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["user"])
            },
        }
    )

    const handleClick = async (e) => {
        e.preventDefault()
        let coverUrl
        let profileUrl

        coverUrl = cover ? await upload(cover) : user.coverPic
        profileUrl = profile ? await upload(profile) : user.profilePic
        mutation.mutate({
            ...texts,
            coverPic: coverUrl,
            profilePic: profileUrl,
        })
        setOpenUpdate(false)
    }

    return (
        <div className="update">
            <form>
                <div className="images-container">
                    <div className="image-upload">
                        <label htmlFor="cover">
                            Cover Image:
                            <input
                                id="cover"
                                type="file"
                                onChange={(e) => setCover(e.target.files[0])}
                                style={{ display: "none" }}
                            />
                            <IconButton
                                component="span"
                                color="primary"
                                aria-label="upload cover picture"
                                style={{ marginLeft: "10px" }}
                            >
                                <PhotoCameraIcon />
                            </IconButton>
                        </label>
                    </div>
                    <div className="image-upload">
                        <label htmlFor="profile">
                            Profile Image:
                            <input
                                id="profile"
                                type="file"
                                onChange={(e) => setProfile(e.target.files[0])}
                                style={{ display: "none" }}
                            />
                            <IconButton
                                component="span"
                                color="primary"
                                aria-label="upload profile picture"
                                style={{ marginLeft: "10px" }}
                            >
                                <PhotoCameraIcon />
                            </IconButton>
                        </label>
                    </div>
                </div>

                <label htmlFor="name">Name:</label>
                <input
                    id="name"
                    type="text"
                    name="name"
                    value={texts.name}
                    onChange={handleChange}
                />

                <label htmlFor="city">City:</label>
                <input
                    id="city"
                    type="text"
                    name="city"
                    placeholder={user.city}
                    onChange={handleChange}
                />

                <label htmlFor="school">School:</label>
                <select
                    id="school"
                    name="school"
                    value={texts.school}
                    onChange={handleChange}
                >
                    {mostUsedOptions.school.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
                <label htmlFor="work">Work:</label>
                <select
                    id="work"
                    name="work"
                    value={texts.work}
                    onChange={handleChange}
                >
                    {mostUsedOptions.work.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
                <label htmlFor="languages_spoken">Languages:</label>
                <select
                    id="languages_spoken"
                    name="languages_spoken"
                    value={texts.languages_spoken}
                    onChange={handleChange}
                >
                    {mostUsedOptions.languages.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
                <label htmlFor="hobbies">Hobbies:</label>
                <select
                    id="hobbies"
                    name="hobbies"
                    value={texts.hobbies}
                    onChange={handleChange}
                >
                    {mostUsedOptions.hobbies.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
                <label htmlFor="nationality">Nationality:</label>
                <select
                    id="nationality"
                    name="nationality"
                    value={texts.nationality}
                    onChange={handleChange}
                >
                    {mostUsedOptions.nationality.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
                <label htmlFor="age">Age:</label>
                <select
                    id="age"
                    name="age"
                    value={texts.age}
                    onChange={handleChange}
                >
                    {mostUsedOptions.age.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>

                <button onClick={handleClick}>Update</button>
                <button onClick={() => setOpenUpdate(false)}>Cancel</button>
            </form>
        </div>
    )
}

export default Update
