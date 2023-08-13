import React, { memo } from "react"
import moment from "moment"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import noPersonImage from "../../../assets/noPersonImage.png"

const Comment = ({
    comment,
    currentUser,
    editMode,
    editCommentId,
    editedDesc,
    handleEdit,
    handleCancelEdit,
    handleUpdate,
    handleDelete,
    setEditedDesc,
}) => {
    const isEditMode = editMode && comment.id === editCommentId

    const handleEditClick = () => {
        handleEdit(comment.id, comment.desc)
    }

    const handleDeleteClick = () => {
        handleDelete(comment.id, comment.userId)
    }

    const handleUpdateSubmit = (e) => {
        e.preventDefault()
        handleUpdate(e, comment.id)
    }

    return (
        <div className="comment" key={comment.id}>
            <img
                src={
                    comment.profilePic
                        ? "/upload/" + comment.profilePic
                        : noPersonImage
                }
                alt=""
                loading="lazy"
            />
            <div className="info">
                <span>{comment.name}</span>
                {!isEditMode ? (
                    <p>{comment.desc}</p>
                ) : (
                    <form onSubmit={handleUpdateSubmit}>
                        <input
                            type="text"
                            value={editedDesc}
                            onChange={(e) => setEditedDesc(e.target.value)}
                            ref={(input) => input && input.focus()}
                        />
                        <div className="button-group">
                            <button type="submit">Update</button>
                            <button type="button" onClick={handleCancelEdit}>
                                Cancel
                            </button>
                        </div>
                    </form>
                )}
            </div>
            <span className="date">{moment(comment.createdAt).fromNow()}</span>
            {currentUser.id === comment.userId && (
                <div className="delete-icon">
                    {!isEditMode && (
                        <button onClick={handleEditClick}>
                            <EditIcon className="icons" />
                        </button>
                    )}
                    <button onClick={handleDeleteClick}>
                        <DeleteIcon className="icons" />
                    </button>
                </div>
            )}
        </div>
    )
}

export default memo(Comment)
