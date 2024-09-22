import React from 'react';
import clubLogos from '@data/clubdata.js'; // Assuming the array is imported correctly

const fallbackImageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAcNzWshGa5rpCiTPxTuLGODwmHNNQVB37VTQ1a9ii77Moenc4';

const positions = {
  1: 'Goalkeeper',
  2: 'Defender',
  3: 'Midfielder',
  4: 'Forward'
};

const PlayerCard = ({ player }) => {
  const playerImageUrl = `https://resources.premierleague.com/premierleague/photos/players/250x250/p${player.code}.png`;
  const clubCrestUrl = clubLogos[player.team];

  const handleImageError = (e) => {
    e.target.src = fallbackImageUrl;
  };

  return (
    <div className="max-w-xs bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl shadow-xl overflow-hidden flex flex-col">
      <div className="relative">
        <img
          src={playerImageUrl}
          alt={`${player.first_name} ${player.second_name}`}
          className="w-full h-60 object-cover object-top rounded-lg"
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
      </div>
      
      <div className="flex-1 p-4 bg-white bg-opacity-60 rounded-bottom-lg flex flex-col justify-between">
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
