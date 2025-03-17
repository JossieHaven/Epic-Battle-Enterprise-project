import { Link } from "react-router-dom";

import heroBanner from "../assets/hero-banner.jpg"; // Replace with actual image path
import villainBanner from "../assets/villain-banner.jpg"; // Replace with actual image path

const Home = () => {
  return (
    <main className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <div className="flex w-full justify-between p-10">
        
        <div className="w-1/2 relative rounded-lg shadow-lg overflow-hidden">
          <img src={heroBanner} alt="Heroes" className="w-full h-full object-cover opacity-80" />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
            <h2 className="text-3xl font-bold text-white">Heroes</h2>
          </div>
        </div>

        
        <div className="w-1/2 relative rounded-lg shadow-lg overflow-hidden">
          <img src={villainBanner} alt="Villains" className="w-full h-full object-cover opacity-80" />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
            <h2 className="text-3xl font-bold text-white">Villains</h2>
          </div>
        </div>
      </div>

      
      <h1 className="text-4xl font-bold mt-6">Home</h1>
      <Link to="/character-selection">
        <button className="mt-6 px-6 py-3 bg-yellow-500 text-black rounded-lg font-bold text-xl">
          Start Battle
        </button>
      </Link>
    </main>
  );
};

export default Home;
