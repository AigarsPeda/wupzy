import type { FC } from "react";
import type { TeamsAttendantMapType } from "types/team.types";

interface TournamentCreateReviewProps {
  isKing: boolean;
  attendants: string[];
  tournamentName: string;
  teamsAttendants: TeamsAttendantMapType;
}

const TournamentCreateReview: FC<TournamentCreateReviewProps> = ({
  isKing,
  attendants,
  tournamentName,
  teamsAttendants,
}) => {
  return (
    <div className="mt-12">
      <p className="text-xs text-gray-400">Mode:</p>
      <h1 className="text-2xl font-bold text-gray-800">
        {isKing ? "King" : "Teams"}
      </h1>

      <p className="mt-4 text-xs text-gray-400">Tournament name:</p>
      <h1 className="text-2xl font-bold text-gray-800">{tournamentName}</h1>

      <p className="mt-4 text-xs text-gray-400">
        Number of {isKing ? "attendants:" : "teams:"}
      </p>
      <h1 className="text-2xl font-bold text-gray-800">
        {isKing ? attendants.length : [...teamsAttendants.keys()].length}
      </h1>

      <p className="mt-4 text-xs text-gray-400">Attendants:</p>
      <div className="max-h-[30rem] w-full overflow-y-auto truncate">
        {isKing ? (
          <div>
            <ul>
              {attendants.map((attendant, i) => (
                <li className="mb-2 text-gray-800" key={`${attendant}${i}`}>
                  {attendant}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div>
            <ul>
              {[...teamsAttendants].map(([key, participants], i) => (
                <li className="mb-2 text-gray-800" key={`${key}${i}`}>
                  {key}
                  <div className="flex space-x-2">
                    {participants.map((attendant, i) => (
                      <span
                        key={`${attendant.name}${i}`}
                        className="text-xs text-gray-400"
                      >
                        {attendant.name}
                      </span>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default TournamentCreateReview;
