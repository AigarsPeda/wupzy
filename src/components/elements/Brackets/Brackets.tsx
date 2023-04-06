import BracketsDropdown from "components/elements/BracketsDropdown/BracketsDropdown";
import type {
  GameKeyTypes,
  GameType,
} from "components/elements/CreatePlayOffModal/CreatePlayOffModal";
import type { FC } from "react";
import Xarrow, { Xwrapper } from "react-xarrows";
import type { TeamType, TeamsMapType } from "types/team.types";
import classNames from "utils/classNames";

type CoordinatesType = {
  end: number[];
  start: number[];
};

interface BracketsProps {
  teamsMap: TeamsMapType;
  selectedTeams: TeamType[];
  brackets: [string, GameType[]][];
  handleTeamsRemove: (selectedTeam: TeamType) => void;
  handleTeamSelect: (
    selectedTeam: TeamType,
    stage: string,
    position: number,
    name: GameKeyTypes
  ) => void;
}

const Brackets: FC<BracketsProps> = ({
  brackets,
  teamsMap,
  selectedTeams,
  handleTeamSelect,
  handleTeamsRemove,
}) => {
  return (
    <div className="relative flex items-center justify-center">
      {brackets.map((games, i) => {
        const isDropdown = i === 0;
        const [stage, teams] = games;
        const isLast = i === brackets.length - 1;
        const hasNext = i < brackets.length - 1;
        const nextArrow = hasNext ? brackets[i + 1] : [];
        const nextTeams = nextArrow && nextArrow.length > 1 ? nextArrow[1] : [];

        return (
          <div
            key={`${stage}${i}`}
            className={classNames(
              i === 0 ? "" : "ml-2 md:ml-10",
              "flex w-full flex-col items-center justify-center transition-all"
            )}
          >
            {teams.map((team, index) => {
              const group = i + 1 > brackets.length ? brackets.length : i + 1;
              const position =
                Math.floor(index / 2) > nextTeams.length - 1
                  ? 0
                  : Math.floor(index / 2);

              const c: CoordinatesType = {
                start: [i, index],
                end: [group, position],
              };

              const marginBottom = `${Math.floor(i * 2 + 2)}rem`;

              return (
                <div key={`${index}`} className="w-full">
                  <Xwrapper>
                    <div
                      id={`elem${c.start.join("")}`}
                      className="min-h-[4rem] w-full rounded bg-gray-300"
                      style={{
                        marginBottom: isLast
                          ? `${i + 1}.${i * 3}rem`
                          : marginBottom,
                      }}
                    >
                      <div className="px-2 py-1">
                        {isDropdown && (
                          <BracketsDropdown
                            teamsMap={teamsMap}
                            selectedTeam={team.team1}
                            selectedTeams={selectedTeams}
                            handleTeamsRemove={handleTeamsRemove}
                            handleTeamSelect={(team) => {
                              handleTeamSelect(team, stage, index, "team1");
                            }}
                          />
                        )}
                      </div>
                      <div className="px-2 py-1">
                        {isDropdown && (
                          <BracketsDropdown
                            teamsMap={teamsMap}
                            selectedTeam={team.team2}
                            selectedTeams={selectedTeams}
                            handleTeamsRemove={handleTeamsRemove}
                            handleTeamSelect={(team) => {
                              handleTeamSelect(team, stage, index, "team2");
                            }}
                          />
                        )}
                      </div>

                      {!isLast && (
                        <Xarrow
                          path="grid"
                          headSize={0}
                          strokeWidth={2}
                          color="#d1d5db"
                          endAnchor="left"
                          startAnchor="right"
                          end={`elem${c.end.join("")}`}
                          start={`elem${c.start.join("")}`}
                        />
                      )}
                    </div>
                  </Xwrapper>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Brackets;
