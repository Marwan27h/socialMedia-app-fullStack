import "./share.scss"
import Image from "../../assets/img.png"
import Map from "../../assets/map.png"
import Friend from "../../assets/friend.png"
import { React, useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/authContext"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { makeRequest } from "../../axios"
import noPersonImage from "../../assets/noPersonImage.png"

const Share = () => {
    const [file, setFile] = useState(null)
    const [desc, setDesc] = useState("")
    const [showPlaceInput, setShowPlaceInput] = useState(false)
    const [place, setPlace] = useState("")
    const [friends, setFriends] = useState([])
    const [showFriendList, setShowFriendList] = useState(false)
    const [selectedFriend, setSelectedFriend] = useState("")
    const [isButtonDisabled, setIsButtonDisabled] = useState(true)

    const { currentUser } = useContext(AuthContext)
    const queryClient = useQueryClient()

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

    const shareMutation = useMutation(
        (newPost) => makeRequest.post("/posts", newPost),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["posts"])
            },
        }
    )

    const handleClick = async (e) => {
        e.preventDefault()
        let imgUrl = ""
        if (file) imgUrl = await upload()
        shareMutation.mutate({
            desc,
            img: imgUrl,
            place,
            friendId: selectedFriend,
        })
        resetFormFields()
    }

    const resetFormFields = () => {
        setDesc("")
        setFile(null)
        setPlace("")
        setSelectedFriend("")
        setShowFriendList(false)
    }

    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const res = await makeRequest.get("/friends")
                setFriends(res.data)
            } catch (error) {
                console.error("Error fetching friends:", error)
            }
        }

        fetchFriends()
    }, [])

    useEffect(() => {
        setIsButtonDisabled(!file && !desc && !place && !selectedFriend)
    }, [file, desc, place, selectedFriend])

    const { data: updatedCurrentUser } = useQuery(
        ["user", currentUser.id],
        async () => {
            const response = await makeRequest.get(
                `/users/find/${currentUser.id}`
            )
            return response.data
        },
        {
            cacheTime: 60000,
            refetchInterval: 30000,
        }
    )


    return (
        <div className="share">
            <div className="container">
                <div className="top">
                    <div className="left">
                        <img
                            src={
                                updatedCurrentUser?.profilePic
                                    ? `/upload/${
                                          updatedCurrentUser.profilePic
                                      }?${Date.now()}`
                                    : noPersonImage
                            }
                            alt=""
                        />
                        <input
                            type="text"
                            placeholder={`What's on your mind, ${
                                updatedCurrentUser?.name || ""
                            }?`}
                            onChange={(e) => setDesc(e.target.value)}
                            value={desc}
                        />
                    </div>
                    <div className="right">
                        {file && (
                            <img
                                className="file"
                                alt=""
                                src={URL.createObjectURL(file)}
                            />
                        )}
                    </div>
                </div>
                <hr />
                <div className="bottom">
                    <div className="left">
                        <input
                            type="file"
                            id="file"
                            style={{ display: "none" }}
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                        <label htmlFor="file">
                            <div className="item">
                                <img src={Image} alt="" />
                                <span>Add Image</span>
                            </div>
                        </label>
                        <div
                            className="item"
                            onClick={() => setShowPlaceInput(!showPlaceInput)}
                        >
                            <img src={Map} alt="" />
                            <span>Add Place</span>
                        </div>
                        {showPlaceInput && (
                            <input
                                type="text"
                                placeholder="Add place"
                                value={place}
                                onChange={(e) =>
                                    setPlace(e.target.value.toUpperCase())
                                }
                            />
                        )}
                        <div className="item">
                            <img src={Friend} alt="" />
                            <span
                                onClick={() =>
                                    setShowFriendList(!showFriendList)
                                }
                            >
                                Tag Friends
                            </span>
                            {showFriendList && (
                                <select
                                    className="select"
                                    value={selectedFriend}
                                    onChange={(e) =>
                                        setSelectedFriend(
                                            e.target.value
                                        ).toUpperCase()
                                    }
                                >
                                    <option value="">Select</option>
                                    {friends.map((friend) => (
                                        <option
                                            key={friend.id}
                                            value={friend.id}
                                        >
                                            {friend.name}
                                        </option>
                                    ))}
                                </select>
                            )}
                        </div>
                    </div>
                    <div className="right">
                        <button
                            disabled={isButtonDisabled}
                            onClick={handleClick}
                        >
                            Share
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Share
