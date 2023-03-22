import type { FC } from "react";

interface TournamentCreateReviewProps {
  attendants: string[];
  tournamentName: string;
}

const TournamentCreateReview: FC<TournamentCreateReviewProps> = ({
  attendants,
  tournamentName,
}) => {
  return (
    <div className="mt-12">
      <p className="text-xs text-gray-400">Tournament name:</p>
      <h1 className="text-2xl font-bold text-gray-800">{tournamentName}</h1>
      <div className="mt-4">
        <p className="text-xs text-gray-400">Attendants:</p>
        <ul className="mt-3">
          {attendants.map((attendant, i) => (
            <li
              className="mb-2 border-b text-gray-800"
              key={`${attendant}${i}`}
            >
              {attendant}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TournamentCreateReview;
