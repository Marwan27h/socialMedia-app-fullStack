import Stories from "../../components/stories/Stories"
import PostsEvent from "./postsEvent/PostsEvent"
import ShareEvent from "./shareEvent/ShareEvent"
import "./event.scss"

const Event = () => {
    return (
        <div className="home">
            <Stories />
            <ShareEvent />
            <PostsEvent />
        </div>
    )
}

export default Event
