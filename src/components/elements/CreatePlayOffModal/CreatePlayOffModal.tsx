import InfoParagraph from "components/elements/InfoParagraph/InfoParagraph";
import ModalWrap from "components/elements/ModalWrap/ModalWrap";
import PlayoffDropdown from "components/elements/PlayoffDropdown/PlayoffDropdown";
import type { FC } from "react";
import { useCallback, useEffect, useState } from "react";
import Xarrow, { Xwrapper, useXarrow } from "react-xarrows";
import { api } from "utils/api";
import classNames from "utils/classNames";
import createMap from "utils/createMap";

type GameType = {
  team1: string | JSX.Element;
  team2: string | JSX.Element;
};

type CoordinatesType = {
  end: number[];
  start: number[];
};

interface CreatePlayOffModalProps {
  isModalOpen: boolean;
  tournamentId: string;
  handleCancelClick: () => void;
}

const CreatePlayOffModal: FC<CreatePlayOffModalProps> = ({
  isModalOpen,
  tournamentId,
  handleCancelClick,
}) => {
  const updateXarrow = useXarrow();
  const [teamCount, setTeamCount] = useState<number | null>(null);
  // const { data: games, refetch: refetchGames } =
  //   api.tournaments.getAllTournamentGames.useQuery({ tournamentId });
  const [brackets, setBrackets] = useState<[string, GameType[]][]>([]);
  const { data: teams, refetch: refetchTeams } =
    api.tournaments.getAllTournamentTeams.useQuery({
      // group,
      tournamentId,
    });

  const cratePlayOffMap = useCallback((num: number | null) => {
    if (!num) return new Map<string, GameType[]>();

    const originalNum = num;
    const playOffMap = new Map<string, GameType[]>();

    while (num > 0) {
      const arr = Array.from(Array(num).keys()).map((n) => {
        const games: GameType = {
          team1: ``,
          team2: ``,
        };

        if (num === originalNum) {
          games.team1 = "Aigars";
          games.team2 = "Jon";
        }

        return games;
      });

      playOffMap.set(`${num}`, arr);

      num = Math.floor(num / 2);
    }

    return playOffMap;
  }, []);

  // useEffect(() => {
  //   if (!teams) return;

  //   console.log("games --->", createMap(teams?.teams));
  // }, [teams]);

  useEffect(() => {
    setBrackets([...cratePlayOffMap(teamCount)]);
  }, [cratePlayOffMap, teamCount]);

  return (
    <ModalWrap
      isFullScreen
      modalWidth="7xl"
      topPosition="top"
      isModalVisible={isModalOpen}
      modalTitle="Create playoffs"
      handleCancelClick={handleCancelClick}
    >
      <div className="h-full w-full overflow-y-auto pb-10">
        <InfoParagraph text="* Once playoffs are created, all other games will be finalized, and you will not be able to change or edit their scores." />
        <div className="mb-4">
          <PlayoffDropdown count={teamCount} handleCountClick={setTeamCount} />
        </div>

        {/* {console.log("cratePlayOffMap", cratePlayOffMap(6))} */}
        {/* <GridLayout isGap minWith="175">
        {teams?.teams &&
          [...createMap(teams?.teams)].map(([group, teams]) => {
            return (
              <div key={group}>
                <p>{group}</p>
                <GroupTeamsCard teams={teams || []} />
              </div>
            );
          })}
      </GridLayout> */}

        <div className="relative flex items-center justify-center">
          {brackets.map((games, i) => {
            const [stage, teams] = games;
            const isLast = i === brackets.length - 1;
            const hasNext = i < brackets.length - 1;
            const nextArrow = hasNext ? brackets[i + 1] : [];
            const nextTeams =
              nextArrow && nextArrow.length > 1 ? nextArrow[1] : [];

            return (
              <div
                key={`${stage}${i}`}
                className={classNames(
                  i === 0 ? "" : "ml-2 md:ml-10",
                  "flex flex-col items-center justify-center transition-all"
                )}
              >
                <>
                  {/* <p>{stage}</p> */}
                  {teams.map((team, index) => {
                    const group =
                      i + 1 > brackets.length ? brackets.length : i + 1;
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
                      <div key={`${index}`}>
                        <Xwrapper>
                          <div
                            id={`elem${c.start.join("")}`}
                            className="h-10 w-20 rounded bg-violet-300"
                            style={{
                              marginBottom: isLast
                                ? `${i + 1}.${i * 3}rem`
                                : marginBottom,
                            }}
                          >
                            <p>{team.team1}</p>
                            <p>{team.team2}</p>

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
                </>
              </div>
            );
          })}
        </div>

        {/* <div className="flex justify-center overflow-x-auto">
          <Xwrapper>
            {brackets.map((games, i) => {
              const [stage, teams] = games;
              const isLast = i === brackets.length - 1;
              const hasNext = i < brackets.length - 1;
              const nextArrow = hasNext ? brackets[i + 1] : [];
              const nextTeams =
                nextArrow && nextArrow.length > 1 ? nextArrow[1] : [];
              return (
                <div
                  key={`${stage}${i}`}
                  className={classNames(i !== 0 && "ml-5 md:ml-28", "")}
                >
                  <div className="grid h-full place-content-center">
                    {teams.map((p, index) => {
                      const group =
                        i + 1 > brackets.length ? brackets.length : i + 1;
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
                        <div key={`${index}${c.start.join("")}`}>
                          <div
                            id={`elem${c.start.join("")}`}
                            className="mb-5 min-w-[10rem] border-2 px-4 py-2"
                            style={{
                              marginBottom: isLast
                                ? `${i + 1}rem`
                                : marginBottom,
                            }}
                          >
                            <p>1: {p.team1}</p>
                            <p>2: {p.team2}</p>
                          </div>

                          {!isLast && (
                            <Xarrow
                              path="grid"
                              headSize={0}
                              curveness={0.6}
                              strokeWidth={2}
                              color="#d1d5db"
                              endAnchor="left"
                              startAnchor="right"
                              end={`elem${c.end.join("")}`}
                              start={`elem${c.start.join("")}`}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </Xwrapper>
        </div> */}
      </div>
    </ModalWrap>
  );
};

export default CreatePlayOffModal;
