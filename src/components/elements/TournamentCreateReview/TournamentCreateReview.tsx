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
      <h1 className="font-bold text-gray-800">{tournamentName}</h1>
      <div className="mt-4">
        <p className="text-xs text-gray-400">Attendants:</p>
        <ul className="">
          {attendants.map((attendant) => (
            <li className="text-gray-800" key={attendant}>
              {attendant}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TournamentCreateReview;
