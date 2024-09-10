import { motion } from 'framer-motion';

const players = [
  { name: 'Player 1', team: 'Team A', goals: 12, assists: 9, image: '/assets/player1.png' },
  { name: 'Player 2', team: 'Team B', goals: 10, assists: 5, image: '/assets/player2.png' },
  // Add more players
];

export default function PlayerStats() {
  return (
    <div className="player-stats-container">
      <h2 className="stats-title">Top Players</h2>
      <div className="stats-grid">
        {players.map((player, idx) => (
          <motion.div
            key={idx}
            className="player-card"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <img src={player.image} alt={player.name} />
            <h3>{player.name}</h3>
            <p>{player.team}</p>
            <p>Goals: {player.goals}</p>
            <p>Assists: {player.assists}</p>
          </motion.div>
        ))}
      </div>
      <style jsx>{`
        .player-stats-container {
          padding: 50px 0;
          text-align: center;
        }
        .stats-title {
          font-size: 2rem;
          color: #00ff88;
        }
        .stats-grid {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 20px;
        }
        .player-card {
          background-color: #222;
          padding: 20px;
          border-radius: 15px;
          width: 200px;
          text-align: center;
          color: #fff;
        }
        .player-card img {
          width: 100px;
          height: 100px;
          object-fit: cover;
          border-radius: 50%;
        }
      `}</style>
    </div>
  );
}
