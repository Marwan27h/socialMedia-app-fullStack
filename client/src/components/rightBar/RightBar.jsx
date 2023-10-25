import "./rightBar.scss"
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query"
import { makeRequest } from "../../axios"
import { useLocation } from "react-router-dom"
import { React, useContext, useState } from "react"
import { AuthContext } from "../../context/authContext"
import SuggestionsSection from "./components/SuggestionsSection/SuggestionsSection"
import OnlineFriendsSection from "./components/OnlineFriendsSection/OnlineFriendsSection"
import LatestActivitiesSection from "./components/LatestActivitiesSection/LatestActivitiesSection"

const RightBar = () => {
    const userId = parseInt(useLocation().pathname.split("/")[2])
    const { currentUser } = useContext(AuthContext)
    const queryClient = useQueryClient()
    const [ignoredUsers, setIgnoredUsers] = useState([])

    const getFirstName = (fullName) => {
        if (fullName) {
            const parts = fullName.split(" ")
            return parts[0]
        }
    }

    const {
        isLoading: isLoadingFriends,
        data: friendsData,
        refetch: refetchFriends,
    } = useQuery(
        ["friends"],
        () => makeRequest.get("/friends").then((res) => res.data),
        {
            refetchInterval: 20000,
        }
    )

    const {
        isLoading: isLoadingSuggestions,
        data: suggestionsData,
        refetch: refetchSuggestions,
    } = useQuery(
        ["suggestions"],
        () => makeRequest.get("/suggestions").then((res) => res.data),
        {
            refetchInterval: 60000,
        }
    )

    const {
        isLoading: isLoadingLatestActivities,
        data: latestActivitiesData,
        refetch: refetchLatestActivities,
    } = useQuery(
        ["latestActivities"],
        () =>
            makeRequest.get("/users/latestActivities").then((res) => res.data),
        {
            refetchInterval: 60000,
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
                refetchFriends()
                refetchSuggestions()
                refetchLatestActivities()
            },
        })
    }

    const handleIgnore = (userId) => {
        ignoreMutation.mutate(userId)
    }

    return (
        <div className="rightBar">
            <div className="container">
                <div className="item">
                    {isLoadingSuggestions ? (
                        <p>Loading suggestions...</p>
                    ) : (
                        <SuggestionsSection
                            suggestionsData={suggestionsData || []}
                            ignoredUsers={ignoredUsers}
                            handleFollow={handleFollow}
                            handleIgnore={handleIgnore}
                            limit={2}
                        />
                    )}
                </div>
                <div className="item">
                    {isLoadingFriends ? (
                        <p>Loading Friends Online ...</p>
                    ) : (
                        <OnlineFriendsSection friendsData={friendsData || []} />
                    )}
                </div>
                <div className="item">
                    {isLoadingLatestActivities ? (
                        <p>Loading LatestActivities ... </p>
                    ) : (
                        <LatestActivitiesSection
                            latestActivities={latestActivitiesData || []}
                            currentUser={currentUser}
                            getFirstName={getFirstName}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default RightBar
