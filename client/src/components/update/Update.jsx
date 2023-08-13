import { useState } from "react"
import { makeRequest } from "../../axios"
import "./update.scss"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import IconButton from "@mui/material/IconButton"
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera"

const Update = ({ setOpenUpdate, user}) => {
    const [cover, setCover] = useState(null)
    const [profile, setProfile] = useState(null)
    const [texts, setTexts] = useState({
        name: user.name || "",
        city: user.city || "",
        school: user.school || "",
        work: user.work || "",
        languages: user.languages_spoken || "", 
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
                {/* ... (existing labels and inputs) */}
                <label htmlFor="cover">
                    Cover Image:
                    <input
                        id="cover"
                        type="file"
                        onChange={(e) => setCover(e.target.files[0])}
                        style={{ display: "none" }} // hide the default file input
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

                <label htmlFor="profile">
                    Profile Image:
                    <input
                        id="profile"
                        type="file"
                        onChange={(e) => setProfile(e.target.files[0])}
                        style={{ display: "none" }} // hide the default file input
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
                <input
                    id="school"
                    type="text"
                    name="school"
                    value={texts.school}
                    onChange={handleChange}
                />
                <label htmlFor="work">Work:</label>
                <input
                    id="work"
                    type="text"
                    name="work"
                    value={texts.work}
                    onChange={handleChange}
                />
                <label htmlFor="languages_spoken">Languages:</label>
                <input
                    id="languages_spoken"
                    type="text"
                    name="languages_spoken"
                    placeholder={user.languages_spoken}
                    onChange={handleChange}
                />

                <label htmlFor="hobbies">Hobbies:</label>
                <input
                    id="hobbies"
                    type="text"
                    name="hobbies" 
                    placeholder={user.hobbies}
                    onChange={handleChange}
                />

                <label htmlFor="nationality">Nationality:</label>
                <input
                    id="nationality"
                    type="text"
                    name="nationality"
                    placeholder={user.nationality}
                    onChange={handleChange}
                />
                <label htmlFor="age">Age:</label>
                <input
                    id="age"
                    type="number"
                    name="age"
                    placeholder={user.age}
                    onChange={handleChange}
                />

                <button onClick={handleClick}>Update</button>
                <button onClick={() => setOpenUpdate(false)}>Cancel</button>
            </form>
        </div>
    )
}

export default Update
