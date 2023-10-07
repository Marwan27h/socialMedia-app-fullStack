import "./postsEvent.scss"
import React from "react"
import moment from "moment"
import { useQuery } from "@tanstack/react-query"
import { makeRequest } from "../../../axios"
import { AddLocationAltOutlined as AddLocationAltIcon } from "@mui/icons-material"
import noPersonImage from "../../../assets/noPersonImage.png"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"

const PostsEvent = () => {
    const { isLoading, error, data } = useQuery(
        ["event"],
        async () => {
            try {
                const response = await makeRequest.get("/event")
                return response.data
            } catch (error) {
                throw new Error("Failed to fetch posts")
            }
        },
        {
            cacheTime: 60000,
            refetchInterval: 10000,
        }
    )

    console.log(data)

    if (isLoading) {
        return <p>Loading...</p>
    }

    if (error) {
        return <p>Error: {error.message}</p>
    }

    return (
        <div>
            {data.map((event) => (
                <div className="postEvent" key={event.title}>
                    <div className="container">
                        <div className="user">
                            <div className="userInfo">
                                <img
                                    src={
                                        event.profilePic
                                            ? `/upload/${event.profilePic}`
                                            : noPersonImage
                                    }
                                    alt=""
                                />
                                <div className="details">
                                    <span className="name">{event.name}</span>
                                    <span className="date">
                                        {moment(event.createdAt).fromNow()}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="content">
                            <h4>{event.title}</h4>
                            <p>{event.desc}</p>
                            {event.img && (
                                <img
                                    className="postImg"
                                    src={
                                        event.img
                                            ? `/upload/${event.img}`
                                            : noPersonImage
                                    }
                                    alt=""
                                />
                            )}
                        </div>
                        <div className="info">
                            {event.startDate && (
                                <div className="dateItem">
                                    <span>
                                        <CalendarMonthIcon className="itemIcon" />
                                        {moment(event.startDate).format(
                                            "MMMM Do YYYY, h:mm a"
                                        )}
                                    </span>
                                </div>
                            )}
                            {event.endDate && (
                                <div className="dateItem">
                                    <span>
                                        <CalendarMonthIcon className="itemIcon" />
                                        {moment(event.endDate).format(
                                            "MMMM Do YYYY, h:mm a"
                                        )}
                                    </span>
                                </div>
                            )}
                            {event.location && (
                                <div className="place">
                                    <AddLocationAltIcon className="itemIcon" />
                                    {event.location}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default PostsEvent
