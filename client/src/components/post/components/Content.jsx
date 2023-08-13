import React from "react"

const Content = ({ editMode, editedDesc, imageURL, setEditedDesc, post }) => {
    return (
        <div className="content">
            {editMode ? (
                <input
                    type="text"
                    value={editedDesc}
                    onChange={(e) => setEditedDesc(e.target.value)}
                />
            ) : (
                <p>{post.desc}</p>
            )}
            {imageURL && <img className="postImg" src={imageURL} alt="" />}
        </div>
    )
}

export default Content
