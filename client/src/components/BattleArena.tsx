import { useLocation } from "react-router-dom";

const BattleArena = () => {
  const location = useLocation();
  const { hero, villain } = location.state || {}; // ✅ Get data from navigation state

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold">⚔️ Battle Arena</h1>

      {hero && villain ? (
        <div className="mt-6">
          <p className="text-2xl">Hero: {hero.name}</p>
          <p className="text-2xl">Villain: {villain.name}</p>
        </div>
      ) : (
        <p className="text-xl text-red-500">No characters selected! Please go back.</p>
      )}
    </div>
  );
};

export default BattleArena;
