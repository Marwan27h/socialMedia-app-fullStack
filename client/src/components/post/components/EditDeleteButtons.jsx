
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material"

const EditDeleteButtons = ({
    editMode,
    handleMenuClick,
    handleUpdate,
    handleDelete,
    setEditMode,
    setMenuOpen,
    menuOpen,
}) => {
    return (
        <div className="icons-wrapper">
            {editMode ? (
                <button  onClick={handleUpdate}>Update</button>
            ) : (
                <>
                    <DeleteIcon
                        className="delete-icon"
                        onClick={handleMenuClick}
                    />
                    <EditIcon
                        className="edit-icon"
                        onClick={() => setEditMode(true)}
                    />
                </>
            )}
            {menuOpen && (
                <div className="menu">
                    <button onClick={handleDelete}>Delete</button>
                </div>
            )}
        </div>
    )
}

export default EditDeleteButtons
