import React from "react"
import { Link } from "react-router-dom"
import noPersonImage from "../../../../assets/noPersonImage.png"

const OnlineFriendsSection = ({ friendsData }) => {
      const firstFiveFriends = friendsData.slice(0, 5)
    return (
        <div className="item">
            <span>Online Friends</span>
            <hr />
            {firstFiveFriends.length === 0 ? (
                <p>No friends online available.</p>
            ) : (
                firstFiveFriends.map((friend, index) => (
                    <div className="user" key={index}>
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
