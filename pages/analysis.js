import Papa from 'papaparse';
import fs from 'fs';
import path from 'path';
import { useState } from 'react';
import Header from '@/components/Header.js';
import { useRouter } from 'next/router';
import clubLogos from '@data/clubdata.js';

export async function getStaticProps() {
  const playersFilePath = path.join(process.cwd(), 'data', 'players.csv');
  const teamsFilePath = path.join(process.cwd(), 'data', 'teams.csv');

  const playersFile = fs.readFileSync(playersFilePath, 'utf-8');
  const teamsFile = fs.readFileSync(teamsFilePath, 'utf-8');

  const playersData = Papa.parse(playersFile, { header: true }).data;
  const teamsData = Papa.parse(teamsFile, { header: true }).data;

  return {
    props: {
      playersData,
      teamsData,
    },
  };
}

const TeamPage = ({ playersData, teamsData }) => {
  const router = useRouter();

  const handleTeamSelect = (teamId) => {
    const teamName = teamsData.find(team => team.id == teamId)?.short_name; // Get the team name based on ID
    if (teamName) {
      // Redirect to the analysis page
      router.push(`/analysis/${teamName.trim().toLowerCase()}`);  // Navigate to /analysis/teamname
    }
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-center">Select a Premier League Team</h1>

        {/* Team Selection Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-10">
          {teamsData
            .filter((team) => clubLogos[team.id])
            .map((team) => (
              <div
                key={team.id}
                onClick={() => handleTeamSelect(team.id)}
                className="cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-105 flex flex-col items-center justify-center border border-gray-300 rounded-lg p-2 bg-white shadow-md"
              >
                <img
                  src={clubLogos[team.id]}
                  alt={team.name}
                  className="w-12 h-12 object-contain mb-2"
                />
                <span className="text-md font-semibold text-center">{team.name}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TeamPage;
