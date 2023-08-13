import React from "react"
import { Link } from "react-router-dom"
import noPersonImage from "../../../../assets/noPersonImage.png"

const OnlineFriendsSection = ({ friendsData }) => {
    return (
        <div className="item">
            <span>Online Friends</span>
            <hr />
            {friendsData.length === 0 ? (
                <p>No friends online available.</p>
            ) : (
                friendsData.map((friend) => (
                    <div className="user" key={friend.userId}>
                        <div className="userInfo">
                            <img
                                src={
                                    friend.profilePic
                                        ? "/upload/" + friend.profilePic
                                        : noPersonImage
                                }
                                alt={friend.name}
                            />
                            <div className="online" />
                            <Link
                                to={`/profile/${friend.userId}`}
                                style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                }}
                            >
                                <span>{friend.name}</span>
                            </Link>
                        </div>
                    </div>
                ))
            )}
        </div>
    )
}

export default OnlineFriendsSection
