'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@components/Header'; // Assuming Header is in the components directory

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Recommender() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredPlayer, setHoveredPlayer] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/recommend-team');
        if (!response.ok) {
          throw new Error('Failed to fetch team data');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-r from-green-400 via-green-500 to-green-600">
        <Header />
        <div className="flex flex-1 justify-center items-center">
          <div className="w-16 h-16 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Header />
        <div className="flex flex-1 justify-center items-center bg-white p-8 rounded-lg shadow-lg">
          <p className="text-red-500 font-semibold">{error}</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  const handleMouseEnter = (player) => {
    setHoveredPlayer(player);
  };

  const handleMouseLeave = () => {
    setHoveredPlayer(null);
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-r from-green-400 via-green-500 to-green-600"
      style={{
        backgroundImage: `url('/assets/bg_laptop.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Header />
      <motion.div
        className="max-w-7xl mx-auto py-16 px-8 sm:px-6 lg:px-8"
        initial="hidden"
        animate="show"
        variants={container}
      >
        <motion.h1
          className="text-4xl font-extrabold text-center text-white mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Recommended Fantasy Team
        </motion.h1>
        <motion.div
          className="text-center text-white mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className="text-lg">Total Points: {data.total_points}</p>
          <p className="text-lg">Total Spend: £{(data.total_spend / 10).toFixed(1)}m</p>
        </motion.div>

        <motion.div
          className="bg-white bg-opacity-80 rounded-lg  overflow-x-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <table className="min-w-full bg-white  rounded-lg overflow-hidden">
            <thead className="bg-green-500 text-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium">Image</th>
                <th className="px-6 py-4 text-right text-sm font-medium">Position</th>
                <th className="px-6 py-4 text-left text-sm font-medium">Name</th>
                <th className="px-6 py-4 text-left text-sm font-medium">Team</th>
                <th className="px-6 py-4 text-right text-sm font-medium">Price</th>
                <th className="px-6 py-4 text-right text-sm font-medium">Points</th>
                <th className="px-6 py-4 text-right text-sm font-medium">Minutes</th>
                <th className="px-6 py-4 text-right text-sm font-medium">Goals</th>
                <th className="px-6 py-4 text-right text-sm font-medium">Assists</th>
                <th className="px-6 py-4 text-right text-sm font-medium">Clean Sheets</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700">
              {data.team.map((player) => {
                const playerImageUrl = `https://resources.premierleague.com/premierleague/photos/players/250x250/p${player.id}.png`;

                return (
                  <motion.tr
                    key={player.id}
                    className="hover:bg-gray-100 transition-colors relative"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    onMouseEnter={() => handleMouseEnter(player)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <td className="px-6 py-4">
                      <img
                        src={playerImageUrl}
                        alt={`${player.firstName} ${player.lastName}`}
                        className="w-12 h-12 rounded-full"
                      />
                    </td>
                    <td className="px-6 py-4 text-right">{player.position}</td>
                    <td className="px-6 py-4">{`${player.firstName} ${player.lastName}`}</td>
                    <td className="px-6 py-4">{player.teamName}</td>
                    <td className="px-6 py-4 text-right">£{(player.price / 10).toFixed(1)}m</td>
                    <td className="px-6 py-4 text-right">{player.Points}</td>
                    <td className="px-6 py-4 text-right">{player.Minutes}</td>
                    <td className="px-6 py-4 text-right">{player.Goals}</td>
                    <td className="px-6 py-4 text-right">{player.Assists}</td>
                    <td className="px-6 py-4 text-right">{player.CleanSheets}</td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </motion.div>
      </motion.div>

      {hoveredPlayer && (
        <motion.div
          className="fixed z-50 p-6 bg-white rounded-lg shadow-xl"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            minWidth: '300px',
            maxWidth: '400px',
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
        >
          <h3 className="text-lg font-semibold">{`${hoveredPlayer.firstName} ${hoveredPlayer.lastName}`}</h3>
          <p className="text-sm text-gray-600">Position: {hoveredPlayer.position}</p>
          <p className="text-sm text-gray-600">Price: £{(hoveredPlayer.price / 10).toFixed(1)}m</p>
          <p className="text-sm text-gray-600">Points: {hoveredPlayer.Points}</p>
          <p className="text-sm text-gray-600">Starts: {hoveredPlayer.Starts}</p>
          <p className="text-sm text-gray-600">Ownership: {hoveredPlayer.Ownership}</p>
          <p className="text-sm text-gray-600">Expected Goals Conceded: {hoveredPlayer.XGC}</p>
          <p className="text-sm text-gray-600">Goals Conceded: {hoveredPlayer.GoalsConceded}</p>
          <p className="text-sm text-gray-600">Expected Goals Involvement: {hoveredPlayer.XGI}</p>
          <p className="text-sm text-gray-600">ID: {hoveredPlayer.id}</p>
        </motion.div>
      )}
    </div>
  );
}
