

const DeleteConfirmationBox = ({ onCancel, onDelete }) => {
    return (
        <div className="delete-confirmation-overlay">
            <div className="delete-confirmation-box">
                <p>Do you want to delete your account?</p>
                <div className="buttons">
                    <button className="delete-btn" onClick={onDelete}>Delete</button>
                    <button onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteConfirmationBox
