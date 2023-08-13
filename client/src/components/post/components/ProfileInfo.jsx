import React, { memo } from "react"
import moment from "moment"
import { Link } from "react-router-dom"
import noPersonImage from "../../../assets/noPersonImage.png"

const ProfileInfo = ({ post }) => {
    return (
        <div className="userInfo">
            <img
                src={
                    post.profilePic
                        ? `/upload/${post.profilePic}`
                        : noPersonImage
                }
                alt=""
                loading="lazy"
            />
            <div className="details">
                <Link
                    to={`/profile/${post.userId}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                >
                    <span style={{ zIndex: 999 }} className="name">
                        {post.name}
                    </span>
                </Link>
                <MemoizedDate createdAt={post.createdAt} />
            </div>
        </div>
    )
}

const Date = ({ createdAt }) => (
    <span className="date">{moment(createdAt).fromNow()}</span>
)

const MemoizedDate = memo(Date)

export default ProfileInfo
