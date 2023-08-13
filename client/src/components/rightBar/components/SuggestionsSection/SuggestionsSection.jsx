import React from "react"
import { Link } from "react-router-dom"
import PersonAddIcon from "@mui/icons-material/PersonAdd"
import PersonRemoveIcon from "@mui/icons-material/PersonRemove"
import noPersonImage from "../../../../assets/noPersonImage.png"

const SuggestionsSection = ({
    suggestionsData,
    ignoredUsers,
    handleFollow,
    handleIgnore,
}) => {
    return (
        <div className="item">
            <span>Suggestions For You</span>
            <hr />
            {suggestionsData.length === 0 ? (
                <p>No suggestions available.</p>
            ) : (
                suggestionsData.map((user) => (
                    <div className="user" key={user.userId}>
                        <div className="userInfo">
                            <img
                                src={
                                    user.profilePic
                                        ? "/upload/" + user.profilePic
                                        : noPersonImage
                                }
                                alt=""
                            />
                            <Link
                                to={`/profile/${user.userId}`}
                                style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                }}
                            >
                                <span>{user.name}</span>
                            </Link>
                        </div>
                        <div className="buttons">
                            <button
                                onClick={() => handleFollow(user.userId)}
                                disabled={ignoredUsers.includes(user.userId)}
                            >
                                <PersonAddIcon />
                            </button>
                            <button
                                onClick={() => handleIgnore(user.userId)}
                                disabled={ignoredUsers.includes(user.userId)}
                            >
                                <PersonRemoveIcon />
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    )
}

export default SuggestionsSection
