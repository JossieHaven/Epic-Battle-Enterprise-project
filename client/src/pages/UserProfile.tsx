import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { updateUserProfile } from "../services/api";
import "./UserProfile.css"; // ✅ Import the new CSS

interface User {
    id: string;
    username: string;
}

function UserProfile() {
    const auth = useContext(AuthContext);
    const [user, setUser] = useState<User | null>(null);
    const [favorites] = useState<string[]>([]);
    const [battles] = useState<any[]>([]);
    const [editMode, setEditMode] = useState(false);
    const [updatedUsername, setUpdatedUsername] = useState("");

    const handleUpdateProfile = async () => {
        try {
            await updateUserProfile(auth?.user?.id || "", { username: updatedUsername });
            setUser((prevUser) => prevUser ? { ...prevUser, username: updatedUsername } : null);
            setEditMode(false);
        } catch (err) {
            console.error("Failed to update profile", err);
        }
    };

    return (
        <div className="profile-container">
            <h2 className="profile-title">Welcome, {user?.username || "Hero"}</h2>

            {editMode ? (
                <div className="edit-profile">
                    <label className="profile-label">Username:</label>
                    <input type="text" className="profile-input" value={updatedUsername} onChange={(e) => setUpdatedUsername(e.target.value)} />

                    <div className="profile-button-group">
                        <button className="profile-btn save-btn" onClick={handleUpdateProfile}>Save</button>
                        <button className="profile-btn cancel-btn" onClick={() => setEditMode(false)}>Cancel</button>
                    </div>
                </div>
            ) 
            : (
                <div className="profile-info">
                    <button className="profile-btn edit-btn" onClick={() => setEditMode(true)}>Edit Profile</button>
                </div>
            )}

            <h3 className="section-title">Favorite Characters</h3>
            {favorites.length > 0 ? (
                <ul className="favorites-list">
                    {favorites.map((char, index) => <li key={index} className="favorite-item">{char}</li>)}
                </ul>
            ) : (
                <p className="empty-text">No favorite characters yet.</p>
            )}

            <h3 className="section-title">Battle History</h3>
            {battles.length > 0 ? (
                <ul className="battle-history">
                    {battles.map((battle, index) => (
                        <li key={index} className="battle-item">
                            Fought against <strong>{battle.opponent}</strong> - <span className="battle-result">{battle.result}</span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="empty-text">No battles recorded yet.</p>
            )}
        </div>
    );
}

export default UserProfile;
