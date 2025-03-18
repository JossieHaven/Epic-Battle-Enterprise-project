import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function UserProfile() {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const [favorites, setFavorites] = useState<string[]>([]);
    const [battles, setBattles] = useState<any[]>([]);

    useEffect(() => {
        if (!auth?.user) {
            navigate("/login");
        } else {
            // Simulated favorites & battles
            setFavorites(["Superman", "Batman"]);
            setBattles([{ opponent: "Joker", result: "Win" }, { opponent: "Thanos", result: "Loss" }]);
        }
    }, [auth, navigate]);

    if (!auth?.user) return null;

    return (
        <div>
            <h2>Welcome, {auth.user.username}</h2>

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
