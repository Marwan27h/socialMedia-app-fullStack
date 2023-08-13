import React, { useState, useContext, useCallback } from "react"
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query"
import { makeRequest } from "../../axios"
import { AuthContext } from "../../context/authContext"
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material"
import ProfileInfo from "./components/ProfileInfo"
import Content from "./components/Content"
import LikeCommentShare from "./components/LikeCommentShare"
import Comments from "../comments/Comments"

import "./post.scss"

const Post = ({ post, imageURL, onShare }) => {
    const [commentOpen, setCommentOpen] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [editedDesc, setEditedDesc] = useState(post.desc)

    const { currentUser } = useContext(AuthContext)
    const queryClient = useQueryClient()

    const { data: likesData } = useQuery(["likes", post.id], () =>
        makeRequest.get("/likes?postId=" + post.id).then((res) => res.data)
    )

    const { data: commentsData } = useQuery(["comments", post.id], () =>
        makeRequest.get("/comments?postId=" + post.id).then((res) => res.data)
    )

    const mutation = useMutation(
        () => {
            const liked = likesData.includes(currentUser.id)
            return liked
                ? makeRequest.delete("/likes?postId=" + post.id)
                : makeRequest.post("/likes", { postId: post.id })
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["likes"])
            },
        }
    )

    const deleteMutation = useMutation(
        () => makeRequest.delete("/posts/" + post.id),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["posts"])
            },
        }
    )

  const handleLike = useCallback(() => {
      mutation.mutate()
  }, [mutation])

    const handleDelete = useCallback(() => {
        deleteMutation.mutateAsync().then(() => {})
    }, [deleteMutation])

    const handleUpdate = useCallback(async () => {
        try {
            await makeRequest.put(`/posts/${post.id}`, {
                desc: editedDesc,
            })
            queryClient.invalidateQueries(["posts"])
            setEditMode(false)
        } catch (error) {}
    }, [post.id, editedDesc, queryClient])

    const handleMenuClick = (e) => {
        e.stopPropagation()
        setMenuOpen(!menuOpen)
    }

    const handleContainerClick = () => {
        if (menuOpen) {
            setMenuOpen(false)
        }
    }

    return (
        <div className="post" onClick={handleContainerClick}>
            <div className="container">
                <div className="user">
                    <ProfileInfo post={post} />
                    {post.userId === currentUser.id && (
                        <>
                            <div className="icons-wrapper">
                                {editMode ? (
                                    <button onClick={handleUpdate}>
                                        Update
                                    </button>
                                ) : (
                                    <>
                                        <DeleteIcon
                                            className="delete-icon"
                                            onClick={handleMenuClick}
                                        />
                                        <EditIcon
                                            className="edit-icon"
                                            onClick={() => setEditMode(true)}
                                        />
                                    </>
                                )}
                            </div>
                            {menuOpen && (
                                <div className="menu">
                                    <button onClick={handleDelete}>
                                        Delete
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
                <Content
                    editMode={editMode}
                    editedDesc={editedDesc}
                    imageURL={imageURL}
                    setEditedDesc={setEditedDesc}
                    post={post}
                />
                <LikeCommentShare
                    likesData={likesData}
                    currentUser={currentUser}
                    handleLike={handleLike}
                    onShare={onShare}
                    commentsData={commentsData}
                    commentOpen={commentOpen}
                    setCommentOpen={setCommentOpen}
                    post={post}
                />
            </div>
            {commentOpen && (
                <Comments postId={post.id} comments={commentsData} />
            )}
        </div>
    )
}

export default Post
