import { useEffect, useState } from 'react';

function InjuryTable() {
    const [injuries, setInjuries] = useState([]);

    useEffect(() => {
        async function fetchInjuries() {
            const response = await fetch('/api/injuries');
            const data = await response.json();
            setInjuries(data);
        }
        
        fetchInjuries();
    }, []);

    return (
        <div>
            <h1>EPL Injury Table</h1>
            {injuries.map((team) => (
                <div key={team.teamName}>
                    <h2>{team.teamName}</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Player</th>
                                <th>Reason</th>
                                <th>Further Detail</th>
                                <th>Potential Return</th>
                                <th>Condition</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {team.players.map((player, index) => (
                                <tr key={index}>
                                    <td>{player.playerName}</td>
                                    <td>{player.reason}</td>
                                    <td>{player.furtherDetail}</td>
                                    <td>{player.potentialReturn}</td>
                                    <td>{player.condition}</td>
                                    <td>{player.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    );
}

export default InjuryTable;
