import React from "react"
import DeleteIcon from "@mui/icons-material/Delete"
import { Link } from "react-router-dom"
import moment from "moment"

const Story = ({ story, currentUser, handleDelete }) => {
    const imageSrc = story.img ? `./upload/${story.img}` : "" 

    return (
        <div className="story">
            <img src={imageSrc} alt="" />
            <Link to={`/profile/${story.userId}`}>
                <span>
                    <b>{story.name}</b>
                    <br />
                    {moment(story.createdAt).fromNow()}
                </span>
            </Link>

            {currentUser.id === story.userId && (
                <button onClick={() => handleDelete(story.id)}>
                    <DeleteIcon fontSize="small" />
                </button>
            )}
        </div>
    )
}

export default Story
