import React from "react"
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined"
import { Link } from "react-router-dom"

const Search = ({
    searchQuery,
    setSearchQuery,
    handleSearch,
    handleBlur,
    isLoading,
    error,
    data,
    searchContainerRef,
    inputRef,
    userFoundRef,
}) => (
    <div
        className="search"
        ref={searchContainerRef}
        style={{ position: "relative" }}
    >
        <SearchOutlinedIcon onClick={handleSearch} />
        <input
            type="text"
            placeholder="Search users by name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onBlur={handleBlur}
            ref={inputRef} // Use the inputRef prop
        />

        {data && typeof data === "object" && searchQuery && (
            <ul
                style={{
                    position: "absolute",
                    top: 26,
                    left: 10,
                    width: "100%",
                    padding: 0,
                    margin: 0,
                }}
            >
                <li key={data.id} ref={userFoundRef}>
                    <Link
                        to={`/profile/${data.id}`}
                        style={{
                            textDecoration: "none",
                            color: "inherit",
                            display: "block",
                            padding: "8px",
                        }}
                    >
                        {data.username}
                    </Link>
                </li>
            </ul>
        )}

        <ul
            style={{
                position: "absolute",
                top: 35,
                left: 10,
                width: "100%",
                padding: 0,
                margin: 0,
            }}
        >
            {isLoading && <li>Loading...</li>}
            {error && <li>No users found!!</li>}
        </ul>
    </div>
)

export default Search
