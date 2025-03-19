import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import './UserProfile.css';
import { fetchUserBattles, fetchUserFavorites, fetchUserProfile, updateUserProfile } from "../services/api";

// Define the User type
interface User {
    id: string;
    username: string;
    email: string;
}

export function UserProfile() {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [favorites] = useState<string[]>([]);
    const [battles] = useState<any[]>([]);
    const [editMode, setEditMode] = useState(false);
    const [updatedUsername, setUpdatedUsername] = useState("");
    const [loading, setLoading] = useState(true);
    const [updatedEmail, setUpdatedEmail] = useState("");
    useEffect(() => {
        if (!auth?.user) {
            navigate("/login");
        } else {
            const loadUserData = async () => {
                try {
                    setLoading(true);
                    if (!auth.user) return;
                    const userData = await fetchUserProfile(auth.user.id);
                    setUser(userData);
                    setUpdatedUsername(userData.username);
                    setUpdatedEmail(userData.email);

                    const favoriteCharacters = await fetchUserFavorites(auth.user.id);
                    setFavorites(favoriteCharacters);

                    const battleHistory = await fetchUserBattles(auth.user.id);
                    setBattles(battleHistory);
                } catch (err) {
                    console.error("Failed to load user data", err);
                } finally {
                    setLoading(false);
                }
            };

            loadUserData();
        }
    }, [auth, navigate]);
    // }, [auth, navigate]);

    const handleLogout = () => {
        localStorage.removeItem("id_token"); // Clear token
        navigate("/userprofile"); // Redirect to login page
        window.location.reload(); // Refresh to reset state
    };

    if (loading) return <p>Loading...</p>;

    if (!auth?.user) return <p>No user found. Please log in.</p>;
    const handleUpdateProfile = async () => {
        try {
            await updateUserProfile(auth?.user?.id || "", { username: updatedUsername, email: updatedEmail });
            setUser((prevUser: any) => prevUser ? { ...prevUser, username: updatedUsername, email: updatedEmail } : null);
            setEditMode(false);
        } catch (err) {
            console.error("Failed to update profile", err);
        }
    };


    return (
        <div className="profile-container">
            <h2>Welcome, {auth.user?.username ?? "Guest"}</h2>

            <button className="logout-btn" onClick={handleLogout}>Logout</button>
            <h2>Welcome, {user?.username}</h2>

            {editMode ? (
                <div className="edit-profile">
                    <label>Username:</label>
                    <input type="text" value={updatedUsername} onChange={(e) => setUpdatedUsername(e.target.value)} />
                    
                    <label>Email:</label>
                    <input type="email" value={updatedEmail} onChange={(e) => setUpdatedEmail(e.target.value)} />

                    <button onClick={handleUpdateProfile}>Save</button>
                    <button onClick={() => setEditMode(false)}>Cancel</button>
                </div>
            ) : (
                <div className="profile-info">
                    <p><strong>Email:</strong> {user?.email}</p>
                    <button onClick={() => setEditMode(true)}>Edit Profile</button>
                </div>
            )}

            <h3>Favorite Characters</h3>
            {favorites.length > 0 ? (
                <ul className="favorites-list">
                    {favorites.map((char, index) => <li key={index}>{char}</li>)}
                </ul>
            ) : (
                <p>No favorite characters yet.</p>
            )}

            <h3>Battle History</h3>
            {battles.length > 0 ? (
                <ul className="battle-history">
                    {battles.map((battle, index) => (
                        <li key={index}>
                            Fought against {battle.opponent} - <strong>{battle.result}</strong>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No battles recorded yet.</p>
            )}
        </div>
    );
}

export default UserProfile;
