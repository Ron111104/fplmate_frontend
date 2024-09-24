import React, { useState } from 'react';
import { motion } from 'framer-motion';
import clubLogos from '@data/clubdata.js';

const fallbackImageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAcNzWshGa5rpCiTPxTuLGODwmHNNQVB37VTQ1a9ii77Moenc4';

const positions = {
  1: 'Goalkeeper',
  2: 'Defender',
  3: 'Midfielder',
  4: 'Forward'
};

const PlayerCard = ({ player }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const playerImageUrl = `https://resources.premierleague.com/premierleague/photos/players/250x250/p${player.code}.png`;
  const clubCrestUrl = clubLogos[player.team];

  const handleImageError = (e) => {
    e.target.src = fallbackImageUrl;
  };

  const handleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  // Create the Wikipedia URL
  const wikiUrl = `https://en.wikipedia.org/wiki/${player.first_name.split(' ')[0]}_${player.second_name.split(' ')[0]}`;

  return (
    <div className="max-w-xs rounded-xl shadow-xl overflow-hidden flex flex-col">
      {/* Flipping Section */}
      <div className="relative h-60" onClick={handleFlip}>
        {/* Front Side */}
        <motion.div
          className={`absolute w-full h-full rounded-top-lg bg-gradient-to-r from-cyan-500 to-blue-500`}
          initial={{ rotateY: 0, opacity: 1 }}
          animate={{ rotateY: isFlipped ? 180 : 0, opacity: isFlipped ? 0 : 1 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{ zIndex: isFlipped ? 0 : 1 }}
        >
          <img
            src={playerImageUrl}
            alt={`${player.first_name} ${player.second_name}`}
            className="w-full h-full object-cover object-top rounded-lg"
            onError={handleImageError}
          />
          <div className="absolute top-4 right-4 bg-white bg-opacity-80 p-2 rounded-full shadow-md">
            <img
              src={clubCrestUrl}
              alt={`${player.team_name} crest`}
              className="w-8 h-8 object-contain"
            />
          </div>
          <div className="absolute top-4 left-4 bg-white bg-opacity-80 px-2 py-1 rounded-full shadow-md">
            <span className="text-xs font-bold text-gray-800">{positions[player.element_type]}</span>
          </div>
        </motion.div>
        
        {/* Back Side */}
        <motion.div
          className={`absolute w-full h-full bg-gradient-to-r from-cyan-200 to-blue-200 bg-opacity-60 p-4 rounded-top-lg`}
          initial={{ rotateY: 180, opacity: 0 }}
          animate={{ rotateY: isFlipped ? 0 : 180, opacity: isFlipped ? 1 : 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{ zIndex: isFlipped ? 1 : 0 }}
        >
          <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-gray-800">
            <div>
              <p className="font-semibold">Expected Goals:</p>
              <p>{player.expected_goals}</p>
            </div>
            <div>
              <p className="font-semibold">Expected Assists:</p>
              <p>{player.expected_assists}</p>
            </div>
            <div>
              <p className="font-semibold">Clean Sheets:</p>
              <p>{player.clean_sheets}</p>
            </div>
            <div>
              <p className="font-semibold">Chance of Playing:</p>
              <p>{player.chance_of_playing_next_round}%</p>
            </div>
            <div>
              <p className="font-semibold">Influence:</p>
              <p>{player.influence}</p>
            </div>
            <div>
              <p className="font-semibold">Threat:</p>
              <p>{player.threat}</p>
            </div>
            <div>
              <p className="font-semibold">Form:</p>
              <p>{player.form}</p>
            </div>
            <div>
              <p className="font-semibold">Total Points:</p>
              <p>{player.total_points}</p>
            </div>
            {/* Wikipedia Link */}
          </div>
          <div className="text-center">
          <a
            href={wikiUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-500 underline hover:text-blue-700"
          >
            Click Here To know more about the player
          </a>
        </div>
        </motion.div>
      </div>

      {/* Static Bottom Section */}
      <div className="flex-1 p-4 bg-gradient-to-r from-cyan-200 to-blue-200 bg-opacity-60 flex flex-col justify-between">
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-2" style={{ maxHeight: '4em', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {player.first_name} {player.second_name}
        </h3>
        <div className="mt-4 flex justify-between items-center">
          <p className="text-2xl font-bold text-green-500">£{(player.now_cost / 10).toFixed(1)}M</p>
          <div className="text-lg font-bold text-green-500 bg-white bg-opacity-40 px-3 py-1 rounded-full shadow-md">
            Rating: {player.predicted_rating}
          </div>
        </div>

        <div className="mt-4 flex justify-between text-sm text-gray-800">
          <div>
            <p className="font-semibold">Goals:</p>
            <p>{player.goals_scored}</p>
          </div>
          <div>
            <p className="font-semibold">Assists:</p>
            <p>{player.assists}</p>
          </div>
          <div>
            <p className="font-semibold">Clean Sheets:</p>
            <p>{player.clean_sheets}</p>
          </div>
        </div>

        <div className="mt-4 flex justify-between text-sm text-gray-800">
          <div>
            <p className="font-semibold">Minutes Played:</p>
            <p>{player.minutes}</p>
          </div>
          <div>
            <p className="font-semibold">Total Points:</p>
            <p>{player.total_points}</p>
          </div>
        </div>

        <div className="mt-4 text-sm flex justify-between text-gray-600">
          <p className="font-semibold">Yellow Cards: {player.yellow_cards}</p>
          <p className="font-semibold">Red Cards: {player.red_cards}</p>
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
