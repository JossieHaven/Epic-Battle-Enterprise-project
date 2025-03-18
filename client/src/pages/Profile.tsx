import { useState, useEffect } from "react";
import { fetchUserProfile, updateUserProfile, fetchUserFavorites, fetchUserBattles } from "../services/api";

interface User {
    id: string;
    username: string;
    email: string;
    favorites: string[];
    battles: any[];
}

function UserProfile() {
    const userId = "12345"; // Replace with real user ID from auth
    const [user, setUser] = useState<User | null>(null);
    const [favorites, setFavorites] = useState<any[]>([]);
    const [battles, setBattles] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [updatedUsername, setUpdatedUsername] = useState("");
    const [updatedEmail, setUpdatedEmail] = useState("");

    useEffect(() => {
        const loadUserData = async () => {
            try {
                const userData = await fetchUserProfile(userId);
                setUser(userData);
                setUpdatedUsername(userData.username);
                setUpdatedEmail(userData.email);

                const favoriteCharacters = await fetchUserFavorites(userId);
                setFavorites(favoriteCharacters);

                const battleHistory = await fetchUserBattles(userId);
                setBattles(battleHistory);
            } catch (err) {
                console.error("Failed to load user data", err);
            } finally {
                setLoading(false);
            }
        };

        loadUserData();
    }, [userId]);

    const handleUpdateProfile = async () => {
        try {
            await updateUserProfile(userId, { username: updatedUsername, email: updatedEmail });
            setUser((prevUser) => prevUser ? { ...prevUser, username: updatedUsername, email: updatedEmail } : null);
            setEditMode(false);
        } catch (err) {
            console.error("Failed to update profile", err);
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <h2>User Profile</h2>
            {user ? (
                <>
                    {editMode ? (
                        <div>
                            <label>Username:</label>
                            <input type="text" value={updatedUsername} onChange={(e) => setUpdatedUsername(e.target.value)} />
                            
                            <label>Email:</label>
                            <input type="email" value={updatedEmail} onChange={(e) => setUpdatedEmail(e.target.value)} />

                            <button onClick={handleUpdateProfile}>Save</button>
                            <button onClick={() => setEditMode(false)}>Cancel</button>
                        </div>
                    ) : (
                        <div>
                            <p><strong>Username:</strong> {user.username}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                            <button onClick={() => setEditMode(true)}>Edit Profile</button>
                        </div>
                    )}

                    <h3>Favorite Characters</h3>
                    {favorites.length > 0 ? (
                        <ul>
                            {favorites.map((char, index) => (
                                <li key={index}>
                                    <strong>{char.name}</strong> ({char.alignment})
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No favorite characters yet.</p>
                    )}

                    <h3>Battle History</h3>
                    {battles.length > 0 ? (
                        <ul>
                            {battles.map((battle, index) => (
                                <li key={index}>
                                    {battle.character} vs {battle.opponent} - <strong>{battle.result}</strong>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No battles recorded yet.</p>
                    )}
                </>
            ) : (
                <p>User not found</p>
            )}
        </div>
    );
}

export default UserProfile;