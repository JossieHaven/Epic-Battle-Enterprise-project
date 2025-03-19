import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import './UserProfile.css';

function UserProfile() {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const [favorites, setFavorites] = useState<string[]>([]);
    const [battles, setBattles] = useState<{ opponent: string; result: string }[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (auth === undefined) return; // Prevent running before auth is defined
        
        if (!auth?.user) {
            navigate("/login"); // Redirect only if there's no user
            return;
        }

        // Simulated user data (Replace with real API calls if needed)
        setFavorites(["Superman", "Batman"]);
        setBattles([
            { opponent: "Joker", result: "Win" },
            { opponent: "Thanos", result: "Loss" }
        ]);

        setLoading(false);
    }, [auth?.user, navigate]);

    const handleLogout = () => {
        localStorage.removeItem("id_token"); // Clear token
        navigate("/login"); // Redirect to login page
        window.location.reload(); // Refresh to reset state
    };

    if (loading) return <p>Loading...</p>;

    if (!auth?.user) return <p>No user found. Please log in.</p>;

    return (
        <div className="profile-container">
            <h2>Welcome, {auth.user?.username ?? "Guest"}</h2>

            <button className="logout-btn" onClick={handleLogout}>Logout</button>

            <h3>Favorite Characters</h3>
            {favorites.length > 0 ? (
                <ul>
                    {favorites.map((char, index) => <li key={index}>{char}</li>)}
                </ul>
            ) : (
                <p>No favorite characters yet.</p>
            )}

            <h3>Battle History</h3>
            {battles.length > 0 ? (
                <ul>
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
