import { React, memo, useState } from "react"
import { makeRequest } from "../../axios"
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query"
import { debounce } from "lodash"
import Post from "../post/Post"
import "./posts.scss"
import SuggestionsSection from "../rightBar/components/SuggestionsSection/SuggestionsSection"

const MemoizedPost = memo(Post)

const Posts = ({ userId }) => {
    const [ignoredUsers, setIgnoredUsers] = useState([])
    const queryClient = useQueryClient()
    const { data: suggestionsData, refetch: refetchSuggestions } = useQuery(
        ["suggestions"],
        () => makeRequest.get("/suggestions").then((res) => res.data),
        {
            refetchInterval: 30000,
        }
    )

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
    const followMutation = useMutation(
        (userId) => makeRequest.post("/relationships", { userId }),
        {
            onMutate: async (userId) => {
                await queryClient.cancelQueries(["friends"])
                const newFriend = suggestionsData.find(
                    (user) => user.userId === userId
                )
                if (newFriend) {
                    queryClient.setQueryData(["suggestions"], (oldData) =>
                        oldData.filter(
                            (user) => user.userId !== newFriend.userId
                        )
                    )
                }
            },
            onSuccess: (data, userId) => {
                queryClient.setQueryData(["friends"], (oldData) => [
                    ...oldData,
                    data,
                ])
                setIgnoredUsers((prevUsers) =>
                    prevUsers.filter((id) => id !== userId)
                )
            },
        }
    )

    const ignoreMutation = useMutation(
        (userId) => {
            const updatedData = suggestionsData.filter(
                (user) => user.userId !== userId
            )
            return Promise.resolve(updatedData)
        },
        {
            onSuccess: (updatedData) => {
                queryClient.setQueryData(["suggestions"], updatedData)
                setIgnoredUsers((prevUsers) => [...prevUsers, userId])
            },
        }
    )

    const handleFollow = (userId) => {
        followMutation.mutate(userId, {
            onSuccess: () => {
                refetchSuggestions()
            },
        })
    }

    const handleIgnore = (userId) => {
        ignoreMutation.mutate(userId)
    }

    const handleSharePost = debounce(async (postId) => {
        try {
            await makeRequest.post(`/posts/share-post?postId=${postId}`)
        } catch (error) {
            console.error("Error sharing post:", error)
        }
    }, 300)

    const renderPosts = () => {
        if (error) {
            return <p>Something went wrong while fetching posts!</p>
        }
        if (isLoading) {
            return <div className="loading-container">Loading...</div>
        }

        if (data.length === 0) {
            return (
                <div className="no-posts-container">
                    <SuggestionsSection
                        suggestionsData={suggestionsData || []}
                        ignoredUsers={ignoredUsers}
                        handleFollow={handleFollow}
                        handleIgnore={handleIgnore}
                        limit={5}
                    />
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
        ))
    }

    return <div className="posts">{renderPosts()}</div>
}

export default Posts
