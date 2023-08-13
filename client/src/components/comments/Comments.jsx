import "./comments.scss"
import React, { useContext, useState } from "react"
import { AuthContext } from "../../context/authContext"
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query"
import { makeRequest } from "../../axios"
import Comment from "./components/Comment"
import noPersonImage from "../../assets/noPersonImage.png"

const Comments = ({ postId }) => {
    const [desc, setDesc] = useState("")
    const [editedDesc, setEditedDesc] = useState("")
    const [editMode, setEditMode] = useState(false)
    const [editCommentId, setEditCommentId] = useState(null)

    const { currentUser } = useContext(AuthContext)

    const { isLoading, data } = useQuery(["comments", postId], () =>
        makeRequest.get("/comments?postId=" + postId).then((res) => res.data)
    )

    const queryClient = useQueryClient()

    const mutation = useMutation(
        (newComment) => makeRequest.post("/comments", newComment),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["comments", postId])
            },
        }
    )

    const handleClick = async (e) => {
        e.preventDefault()
        if (desc.trim() !== "") {
            mutation.mutate({ desc, postId })
            setDesc("")
        }
    }

    const handleDelete = async (commentId, userId) => {
        if (userId === currentUser.id) {
            try {
                await makeRequest.delete(`/comments/${commentId}`)
                queryClient.invalidateQueries(["comments"])
            } catch (error) {
                console.error("Error deleting comment:", error)
            }
        }
    }

    const handleEdit = (commentId, initialDesc) => {
        setEditMode(true)
        setEditCommentId(commentId)
        setEditedDesc(initialDesc)
    }

    const handleCancelEdit = () => {
        setEditMode(false)
        setEditCommentId(null)
        setEditedDesc("")
    }

    const handleUpdate = async (e, commentId) => {
        e.preventDefault()
        try {
            await makeRequest.put(`/comments/${commentId}`, {
                desc: editedDesc,
            })
            queryClient.invalidateQueries(["comments"])
            setEditMode(false)
            setEditCommentId(null)
            setEditedDesc("")
        } catch (error) {
            console.error("Error updating comment:", error)
        }
    }

    return (
        <div className="comments">
            <div className="write">
                <img
                    src={
                        currentUser.profilePic
                            ? "/upload/" + currentUser.profilePic
                            : noPersonImage
                    }
                    alt=""
                    loading="lazy"
                />
                <input
                    type="text"
                    placeholder="Write a comment"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                />
                <button onClick={handleClick} disabled={!desc.trim()}>
                    Send
                </button>
            </div>
            {isLoading
                ? ""
                : data.map((comment) => (
                      <Comment
                          key={comment.id}
                          comment={comment}
                          currentUser={currentUser}
                          editMode={editMode}
                          editCommentId={editCommentId}
                          editedDesc={editedDesc}
                          handleEdit={handleEdit}
                          handleCancelEdit={handleCancelEdit}
                          handleUpdate={handleUpdate}
                          handleDelete={handleDelete}
                          setEditedDesc={setEditedDesc}
                          setEditCommentId={setEditCommentId}
                          setEditMode={setEditMode}
                          desc={desc}
                          setDesc={setDesc}
                      />
                  ))}
        </div>
    )
}

export default Comments