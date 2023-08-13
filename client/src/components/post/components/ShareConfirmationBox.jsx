import React from "react"


const ShareConfirmationBox = ({ post, onCancel, onShare }) => {
    return (
        <div className="share-confirmation-overlay">
            <div className="share-confirmation-box">
               <p>Do you want to share this post?</p>
                <div className="buttons">
                    <button onClick={onShare}>Share</button>
                    <button onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default ShareConfirmationBox
