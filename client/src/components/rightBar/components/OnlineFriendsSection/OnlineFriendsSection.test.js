import React from "react"
import { render, screen } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import "@testing-library/jest-dom/extend-expect" // Import jest-dom matchers

import OnlineFriendsSection from "./OnlineFriendsSection"

test("renders online friends section", () => {
    const friendsData = [
        {
            userId: 12,
            name: "Virgin Van Gaal",
            profilePic: "1689513233056images.jpeg",
        },
        {
            userId: 13,
            name: "Nour Homsi",
            profilePic: "1690656439809images (2).jpeg",
        },
    ]

    render(
        <BrowserRouter>
            <OnlineFriendsSection friendsData={friendsData} />
        </BrowserRouter>
    )

    const onlineFriendsHeader = screen.getByText("Online Friends")
    expect(onlineFriendsHeader).toBeInTheDocument()

    const friend1Name = screen.getByText("Virgin Van Gaal")
    expect(friend1Name).toBeInTheDocument()

    const friend2Name = screen.getByText("Nour Homsi")
    expect(friend2Name).toBeInTheDocument()

    const friend1Image = screen.getByRole("img", { name: "Virgin Van Gaal" })
    expect(friend1Image).toBeInTheDocument()

    const friend2Image = screen.getByRole("img", { name: "Nour Homsi" })
    expect(friend2Image).toBeInTheDocument()
})
