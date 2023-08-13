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
    inputRef, // Add inputRef prop
    userFoundRef, // Add userFoundRef prop
}) => (
    <div className="search" ref={searchContainerRef}>
        <SearchOutlinedIcon onClick={handleSearch} />
        <input
            type="text"
            placeholder="Search users by name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onBlur={handleBlur}
            ref={inputRef} // Use the inputRef prop
        />

        {isLoading && <p>Loading...</p>}

        {error && <p>NO users found!!</p>}
        {data && typeof data === "object" && searchQuery && (
            <ul>
                <li key={data.id} ref={userFoundRef}>
                    {" "}
                    {/* Use the userFoundRef prop */}
                    <Link
                        to={`/profile/${data.id}`}
                        style={{
                            textDecoration: "none",
                            color: "inherit",
                        }}
                    >
                        {data.username}
                    </Link>
                </li>
            </ul>
        )}
    </div>
)

export default Search
