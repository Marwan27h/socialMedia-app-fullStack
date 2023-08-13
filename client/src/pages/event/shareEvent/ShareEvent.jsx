import "./shareEvent.scss"
import Image from "../../../assets/img.png"
import { useContext, useState } from "react"
import { AuthContext } from "../../../context/authContext"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import noPersonImage from "../../../assets/noPersonImage.png"
import { makeRequest } from "./../../../axios"
import moment from "moment"
import DescriptionIcon from "@mui/icons-material/Description"
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt"

const ShareEvent = () => {
    const [file, setFile] = useState(null)
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [location, setLocation] = useState("")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")

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

    const mutation = useMutation(
        (newEvent) => makeRequest.post("/event", newEvent),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["events"])
            },
        }
    )

    const handleClick = async (e) => {
        e.preventDefault()
        let imgUrl = ""
        if (file) imgUrl = await upload()
        mutation.mutate({
            title,
            desc,
            img: imgUrl,
            location,
            startDate,
            endDate,
        })
        resetFormFields()
    }

    const formatDatePickerValue = (date) => {
        return date ? moment(date).format("YYYY-MM-DD") : ""
    }

    const resetFormFields = () => {
        setTitle("")
        setDesc("")
        setFile(null)
        setLocation("")
        setStartDate("")
        setEndDate("")
    }

    return (
        <div className="shareEvent">
            <div className="container-event">
                <div className="top">
                    <div className="left">
                        <img
                            src={
                                currentUser.profilePic
                                    ? "/upload/" + currentUser.profilePic
                                    : noPersonImage
                            }
                            alt=""
                        />
                        <input
                            type="text"
                            placeholder={`Add Title of your Event, ${currentUser.name}?`}
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
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

                <div className="top">
                    <div className="left">
                        <DescriptionIcon />
                        <input
                            type="text"
                            placeholder={`Add description of your Event?`}
                            onChange={(e) => setDesc(e.target.value)}
                            value={desc}
                        />
                    </div>
                </div>

                <div className="top">
                    <div className="left">
                        <AddLocationAltIcon />
                        <input
                            type="text"
                            placeholder={`Add location of your Event?`}
                            onChange={(e) => setLocation(e.target.value)}
                            value={location}
                        />
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
                        <div className="item">
                            <input
                                type="date"
                                id="startDate"
                                value={formatDatePickerValue(startDate)}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                            <span>Start Date</span>
                        </div>
                        <div className="item">
                            <input
                                type="date"
                                value={formatDatePickerValue(endDate)}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                            <span>End Date</span>
                        </div>
                    </div>
                    <div className="right">
                        <button onClick={handleClick}>Share</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShareEvent
