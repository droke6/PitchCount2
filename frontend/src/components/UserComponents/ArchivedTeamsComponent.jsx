import React from 'react'

function ArchivedTeamsComponent() {
  return (
    <div className="coach-teams-section">
        <div className="archived-teams-grid">
            {sortedTeamList.length === 0 ? (
            <div className="no-teams">
                <p>You have not archived any teams.</p>
            </div>
        ) : (
            sortedTeamList.map(team, index  => (
                <div className="team-item">
                    <h3>team name</h3>
                    <div className="team-options">
                        <a href="">Team Roster</a>
                        <a href="">Reports</a>
                        <div>
                            <button>Delete</button>
                            <button>Unarchive</button>
                        </div>
                    </div>
                </div>
            ))
        )}
        </div>
    </div>
  );
}

export default ArchivedTeamsComponent