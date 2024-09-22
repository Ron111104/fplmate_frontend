import Papa from 'papaparse';
import fs from 'fs';
import path from 'path';
import PlayerCard from '../../components/PlayerCard.js';
import Header from '@/components/Header.js';

export async function getStaticPaths() {
  const teamsFilePath = path.join(process.cwd(), 'data', 'teams.csv');
  const teamsFile = fs.readFileSync(teamsFilePath, 'utf-8');
  const teamsData = Papa.parse(teamsFile, { header: true }).data;

  const paths = teamsData
    .filter(team => team.short_name)
    .map((team) => ({
      params: { teamName: team.short_name.trim().toLowerCase() },
    }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const playersFilePath = path.join(process.cwd(), 'data', 'players.csv');
  const teamsFilePath = path.join(process.cwd(), 'data', 'teams.csv');
  const playersFile = fs.readFileSync(playersFilePath, 'utf-8');
  const teamsFile = fs.readFileSync(teamsFilePath, 'utf-8');

  const playersData = Papa.parse(playersFile, { header: true }).data;
  const teamsData = Papa.parse(teamsFile, { header: true }).data;

  const team = teamsData.find(team => team.short_name.trim().toLowerCase() === params.teamName);
  const filteredPlayers = playersData.filter(player => player.team === team.id);

  return {
    props: {
      team,
      filteredPlayers,
    },
  };
}

const TeamAnalysisPage = ({ team, filteredPlayers }) => {
  const sortedPlayers = filteredPlayers.sort((a, b) => Number(b.predicted_rating) - Number(a.predicted_rating));

  const totalPredictedPoints = sortedPlayers.reduce((acc, player) => acc + Number(player.predicted_rating), 0);
  const averagePredictedPoints = sortedPlayers.length ? (totalPredictedPoints / sortedPlayers.length).toFixed(2) : 0;

  return (
    <div className=" min-h-screen">
      <Header />
      <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-4 text-center animate-bounce">Performance Analysis for {team.name}</h1>
        <p className="text-lg font-semibold text-center mb-4">Predictions based on previous season performance.</p>

        {/* Player Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {sortedPlayers.length > 0 ? (
            sortedPlayers.map((player) => (
              <div className="transform transition-transform hover:scale-105 hover:shadow-2xl rounded-lg overflow-hidden" key={player.id}>
                <PlayerCard player={player} className="h-full" />
              </div>
            ))
          ) : (
            <p className="text-center text-lg">No players found for this team.</p>
          )}
        </div>

        {/* Summary Section */}
        <div className="mt-6 text-center">
          <p className="text-md">Total Players: {sortedPlayers.length}</p>
          <p className="text-md">Total Predicted Points: {totalPredictedPoints}</p>
          <p className="text-md">Average Predicted Points per Player: {averagePredictedPoints}</p>
        </div>
      </div>
    </div>
  );
};

export default TeamAnalysisPage;