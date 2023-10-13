import "./profile.scss"
import React, { useContext, useEffect, useState, useCallback } from "react"
import { useLocation } from "react-router-dom"
import { AuthContext } from "../../context/authContext"
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query"
import { makeRequest } from "../../axios"
import ProfileImages from "./components/ProfileImages"
import ProfileUserInfo from "./components/ProfileUserInfo"
import Update from "../../components/update/Update"
import Share from "../../components/share/Share"
import Posts from "../../components/posts/Posts"

const Profile = () => {
    const [openUpdate, setOpenUpdate] = useState(false)
    const [followingCount, setFollowingCount] = useState(0)
    const [followedCount, setFollowedCount] = useState(0)
    const [followingCountIsLoading, setFollowingCountIsLoading] = useState(true)
    const [followedCountIsLoading, setFollowedCountIsLoading] = useState(true)

    const { currentUser } = useContext(AuthContext)

    const userId = parseInt(useLocation().pathname.split("/")[2])

    const queryClient = useQueryClient()

    const clearCachedUserData = useCallback(() => {
        queryClient.removeQueries(["user"])
        queryClient.removeQueries(["relationship"])
    }, [queryClient])

    useEffect(() => {
        clearCachedUserData()
    }, [userId, clearCachedUserData])

    const { isLoading, data } = useQuery(["user"], () =>
        makeRequest.get("/users/find/" + userId).then((res) => {
            return res.data
        })
    )

    const { isLoading: rIsLoading, data: relationshipData } = useQuery(
        ["relationship"],
        () =>
            makeRequest
                .get("/relationships?followedUserId=" + userId)
                .then((res) => {
                    return res.data
                })
    )

    const mutation = useMutation(
        (following) => {
            if (following)
                return makeRequest.delete("/relationships?userId=" + userId)
            return makeRequest.post("/relationships", { userId })
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["relationship"])
            },
        }
    )

    const handleFollow = () => {
        mutation.mutate(relationshipData.includes(currentUser.id))
    }

    const [images, setImages] = useState([])
    const [showSlideshow, setShowSlideshow] = useState(false)
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    const handleGalleryClick = async () => {
        try {
            console.log("handleGalleryClick is called")
            setShowSlideshow(true)
            const response = await makeRequest.get(`/posts/images/${userId}`)
            console.log("Response data:", response.data)
            setImages(response.data)
            setCurrentImageIndex(0)
        } catch (error) {
            console.error("Error in handleGalleryClick:", error)
            setShowSlideshow(true)
        }
    }

    const handleCloseSlideshow = () => {
        setShowSlideshow(false)
        setImages([])
    }

    const fetchFollowingCount = useCallback(async () => {
        try {
            const response = await makeRequest.get(
                `/friends/following-count/${userId}`
            )
            setFollowingCount(response.data)
        } catch (error) {
            console.error("Error fetching following count:", error)
        } finally {
            setFollowingCountIsLoading(false)
        }
    }, [userId])

    const fetchFollowedCount = useCallback(async () => {
        try {
            const response = await makeRequest.get(
                `/friends/followed-count/${userId}`
            )
            setFollowedCount(response.data)
         
        } catch (error) {
            console.error("Error fetching followed count:", error)
        } finally {
            setFollowedCountIsLoading(false)
        }
    }, [userId])

    useEffect(() => {
        const fetchCounts = async () => {
            await fetchFollowingCount()
            await fetchFollowedCount()
        }

        fetchCounts()
    }, [fetchFollowingCount, fetchFollowedCount])
       console.log(followedCount)

    return (
        <div className="profile">
            {isLoading ? (
                <div className="loading-container">Loading...</div>
            ) : (
                <>
                    <ProfileImages data={data} />
                    <div className="profileContainer">
                        <ProfileUserInfo
                            data={data}
                            userId={userId}
                            currentUser={currentUser}
                            rIsLoading={rIsLoading}
                            relationshipData={relationshipData}
                            handleFollow={handleFollow}
                            setOpenUpdate={setOpenUpdate}
                            images={images}
                            showSlideshow={showSlideshow}
                            setShowSlideshow={setShowSlideshow}
                            handleGalleryClick={handleGalleryClick}
                            handleCloseSlideshow={handleCloseSlideshow}
                            currentImageIndex={currentImageIndex}
                            setCurrentImageIndex={setCurrentImageIndex}
                            followingCountLoading={followingCountIsLoading}
                            followingCount={followingCount}
                            followedCountLoading={followedCountIsLoading}
                            followedCount={followedCount}
                        />
                    </div>
                    {currentUser.id === userId && <Share />}

                    <Posts userId={userId} />
                </>
            )}
            {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data} />}
        </div>
    )
}

export default Profile
