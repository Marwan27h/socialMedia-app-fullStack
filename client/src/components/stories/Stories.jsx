import React, { useContext, useEffect, useState } from "react"
import Image from "../../assets/img.png"
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto"
import "./stories.scss"
import { AuthContext } from "../../context/authContext"
import { makeRequest } from "../../axios"
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query"
import Story from "../story/Story"
import { Link } from "react-router-dom"
import noPersonImage from "../../assets/noPersonImage.png"

const Stories = () => {
    const [file, setFile] = useState(null)
    const [filteredData, setFilteredData] = useState([])
    const { currentUser } = useContext(AuthContext)
    const { isLoading, error, data } = useQuery(["stories"], () =>
        makeRequest("/stories").then((res) => {
            return res.data
        })
    )

    const upload = async () => {
        try {
            const formData = new FormData()
            formData.append("file", file)
            const res = await makeRequest.post("/upload", formData)
            return res.data
        } catch (err) {
            console.log(err)
        }
    }

    const queryClient = useQueryClient()

    const mutation = useMutation(
        (storyId) => {
            return makeRequest.post("/stories", storyId)
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["stories"])
            },
        }
    )

    const deleteMutation = useMutation(
        (storyId) => {
            return makeRequest.delete("/stories/" + storyId)
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["stories"])
            },
        }
    )

    const handleDelete = (storyId) => {
        deleteMutation.mutate(storyId)
    }

    const handleClick = () => {
        document.getElementById("storyFile").click()
    }

    const handleFileChange = (e) => {
        setFile(e.target.files[0])
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        console.log("handleFormSubmit")
        let imgUrl = ""
        if (file) imgUrl = await upload()

        mutation.mutate({ img: imgUrl })
        setFile(null)
    }
    useEffect(() => {
        const filterStories = () => {
            const currentTime = Date.now()
            const fortyEightHours = 48 * 60 * 60 * 1000

            const filteredStories = data.filter(
                (story) =>
                    currentTime - new Date(story.createdAt).getTime() <
                    fortyEightHours
            )

            setFilteredData(filteredStories)
        }

        if (!isLoading && data) {
            filterStories()
        }
    }, [isLoading, data])

    return (
        <div className="stories">
            <div className="story">
                <img
                    src={
                        currentUser.profilePic
                            ? "./upload/" + currentUser.profilePic
                            : noPersonImage
                    }
                    alt=""
                />

                {file ? (
                    <button onClick={handleFormSubmit}>+</button>
                ) : (
                    <button onClick={handleClick}>
                        <AddAPhotoIcon fontSize="small" />
                    </button>
                )}
                <form onSubmit={handleFormSubmit}>
                    <input
                        type="file"
                        id="storyFile"
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                        accept="image/*"
                    />
                    <label htmlFor="file">
                        <div className="item">
                            <img src={Image} alt="" />
                            <Link
                                to={`/profile/${currentUser.id}`}
                                style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                }}
                            >
                                <span>{currentUser.name}</span>
                            </Link>
                        </div>
                    </label>
                </form>
            </div>
            {error
                ? "Something went wrong"
                : isLoading
                ? "Loading"
                : filteredData.map((story) => (
                      <Story
                          key={story.id}
                          story={story}
                          currentUser={currentUser}
                          handleDelete={handleDelete}
                      />
                  ))}
        </div>
    )
}

export default Stories
