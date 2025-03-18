import { useLocation, useNavigate } from "react-router-dom";

const BattleArena = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { hero, villain } = location.state || {};

  if (!hero || !villain) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
        <h1 className="text-3xl font-bold mb-4">No characters selected!</h1>
        <button
          onClick={() => navigate("/search")}
          className="px-6 py-3 bg-yellow-500 text-black rounded-lg font-bold text-xl"
        >
          Play Again
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold">⚔️ Battle Arena</h1>

      <div className="flex justify-center space-x-10 mt-8">
        {/* Hero Section */}
        <div className="text-center">
          <h2 className="text-2xl font-bold">{hero.name}</h2>
          <img
            src={hero.image}
            alt={hero.name}
            className="w-40 h-40 object-cover rounded-lg border border-blue-500"
          />
          <p className="mt-2">Power: {hero.power}</p>
          <p>Defense: {hero.defense}</p>
          <p>Ability: {hero.ability}</p>
        </div>

        {/* VS Section */}
        <h1 className="text-5xl font-bold">VS</h1>

        {/* Villain Section */}
        <div className="text-center">
          <h2 className="text-2xl font-bold">{villain.name}</h2>
          <img
            src={villain.image}
            alt={villain.name}
            className="w-40 h-40 object-cover rounded-lg border border-red-500"
          />
          <p className="mt-2">Power: {villain.power}</p>
          <p>Defense: {villain.defense}</p>
          <p>Ability: {villain.ability}</p>
        </div>
      </div>

      <button
        onClick={() => navigate("/search")}
        className="mt-6 px-6 py-3 bg-yellow-500 text-black rounded-lg font-bold text-xl"
      >
        Choose Again
      </button>
    </div>
  );
};

export default BattleArena;
