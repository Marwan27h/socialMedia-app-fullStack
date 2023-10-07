import { React, memo } from "react";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { debounce } from "lodash";
import Post from "../post/Post";
import "./posts.scss";

const MemoizedPost = memo(Post);

const Posts = ({ userId }) => {
    const { isLoading, error, data } = useQuery(
        ["posts", userId],
        async () => {
            try {
                const response = await makeRequest.get(
                    `/posts?userId=${userId}`
                )
                return response.data
            } catch (error) {
                throw new Error("Failed to fetch posts")
            }
        },
        {
            cacheTime: 60000,
            refetchInterval: 10000, 
        }
    )

    const handleSharePost = debounce(async (postId) => {
        try {
            await makeRequest.post(`/posts/share-post?postId=${postId}`);
        } catch (error) {
            console.error("Error sharing post:", error);
        }
    }, 300);

    const renderPosts = () => {
        if (error) {
            return <p>Something went wrong while fetching posts!</p>;
        }
  if (isLoading) {
      return <div className="loading-container">Loading...</div>
  }

  if (data.length === 0) {
      return (
          <div className="no-posts-container">
              You haven't posted anything yet,
          </div>
      )
  }


        return data.map((post) => (
            <MemoizedPost
                post={post}
                key={post.id}
                imageURL={post.img ? `/upload/${post.img}` : null}
                onShare={() => handleSharePost(post.id)}
            />
        ));
    };

    return <div className="posts">{renderPosts()}</div>;
};

export default Posts;
