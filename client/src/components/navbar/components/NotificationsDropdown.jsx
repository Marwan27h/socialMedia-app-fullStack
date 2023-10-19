import React, { useContext } from "react"
import moment from "moment"
import noPersonImage from "../../../assets/noPersonImage.png"
import { AuthContext } from "../../../context/authContext"
import "./NotificationsDropdown.scss"

const NOTIFICATION_TYPES = {
    COMMENT: "comment",
    LIKE: "like",
}

const NotificationsDropdown = ({ notifications }) => {
    const { currentUser } = useContext(AuthContext)

    return (
        <div className="notifications-dropdown">
            <div className="item">
                <ul>
                    {notifications.map((notification) => (
                        <li key={notification.notificationCreatedAt}>
                            <div className="user">
                                <div className="userInfo">
                                    <img
                                        src={
                                            notification?.actionUserProfilePic
                                                ? "/upload/" +
                                                  notification.actionUserProfilePic
                                                : noPersonImage
                                        }
                                        alt="User Profile"
                                    />
                                    <span className="notificationText">
                                        <span className="actionUser">
                                            {notification.actionUserId ===
                                            currentUser.id
                                                ? "You"
                                                : notification.actionUserName}
                                        </span>{" "}
                                        <span className="actionType">
                                            {notification.type ===
                                            NOTIFICATION_TYPES.COMMENT
                                                ? "commented on your post"
                                                : notification.type ===
                                                      NOTIFICATION_TYPES.LIKE &&
                                                  "liked your post"}
                                        </span>
                                        <br />
                                        <span className="actionDate">
                                            {moment(
                                                notification.notificationCreatedAt
                                            ).fromNow()}
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default NotificationsDropdown
