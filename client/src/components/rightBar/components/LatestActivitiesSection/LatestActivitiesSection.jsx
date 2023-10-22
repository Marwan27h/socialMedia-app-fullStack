import React, { useMemo } from "react"
import noPersonImage from "../../../../assets/noPersonImage.png"
import moment from "moment"

const getActivityText = (activity) => {
    let text = ""
    switch (activity.type) {
        case "post":
            text = "posted a new post"
            break
        case "comment":
            text = "commented on a post"
            break
        case "like":
            text = "liked a post"
            break

        default:
            break
    }
    return text
}

const LatestActivitiesSection = ({
    latestActivities,
    currentUser,
    getFirstName,
}) => {
    const memoizedGetFirstName = useMemo(() => getFirstName, [getFirstName])

    return (
        <div className="item">
            <span>Latest Activities</span>
            <hr />
            {latestActivities.length === 0 ? (
                <p>
                    No recent activities. Write your first post and add friends!
                </p>
            ) : (
                latestActivities.map((activity) => (
                    <div className="user" key={activity.activityId}>
                        <div className="userInfo">
                            <img
                                src={
                                    activity.userAvatar
                                        ? "/upload/" + activity.userAvatar
                                        : noPersonImage
                                }
                                alt=""
                            />
                            <p>
                                <span>
                                    {activity.userId === currentUser.id
                                        ? "You"
                                        : memoizedGetFirstName(
                                              activity.userName
                                          )}
                                </span>{" "}
                                {getActivityText(activity)}
                            </p>
                        </div>
                        <span style={{ fontSize: "8px" }}>
                            {moment(activity.timestamp).fromNow()}
                        </span>
                    </div>
                ))
            )}
        </div>
    )
}

export default LatestActivitiesSection
