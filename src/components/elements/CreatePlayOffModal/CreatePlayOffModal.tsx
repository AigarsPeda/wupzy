import InfoParagraph from "components/elements/InfoParagraph/InfoParagraph";
import ModalWrap from "components/elements/ModalWrap/ModalWrap";
import type { FC } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { api } from "utils/api";
import classNames from "utils/classNames";
import createMap from "utils/createMap";
import Xarrow, { useXarrow, Xwrapper } from "react-xarrows";

type CoordinatesType = {
  end: string;
  start: string;
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
  // const { data: games, refetch: refetchGames } =
  //   api.tournaments.getAllTournamentGames.useQuery({ tournamentId });

  const [coordinates, setCoordinates] = useState<CoordinatesType[]>([]);
  const { data: teams, refetch: refetchTeams } =
    api.tournaments.getAllTournamentTeams.useQuery({
      // group,
      tournamentId,
    });

  useEffect(() => {
    if (!teams) return;

    console.log("games --->", createMap(teams?.teams));
  }, [teams]);

  // [[1, 2, 3, 4],[5,6],[7]]
  // const createArray = (num: number): number[][] => {
  //   const result: number[][] = [];

  //   while (num > 0) {
  //     const arr = Array.from(Array(num).keys()).map((el) => el + 1);

  //     result.push(arr);

  //     num = Math.floor(num / 2);
  //   }

  //   return result;
  // };

  type Game = {
    team1: string;
    team2: string;
  };

  // const cratePlayOffMap = (num: number) => {
  //   const playOffMap = new Map<string, Game[]>();

  //   while (num > 0) {
  //     const arr = Array.from(Array(num).keys()).map((n) => {
  //       const games: Game = {
  //         team1: `${n} Aigars`,
  //         team2: `${n} Jon`,
  //       };

  //       return games;
  //     });

  //     playOffMap.set(`${num}`, arr);

  //     num = Math.floor(num / 2);
  //   }

  //   return playOffMap;
  // };

  const cratePlayOffMap = (num: number) => {
    const originalNum = num;
    const playOffMap = new Map<string, Game[]>();

    while (num > 0) {
      const arr = Array.from(Array(num).keys()).map((n) => {
        const games: Game = {
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
  };

  return (
    <ModalWrap
      modalWidth="7xl"
      topPosition="top"
      isModalVisible={isModalOpen}
      modalTitle="Create playoffs"
      handleCancelClick={handleCancelClick}
    >
      <InfoParagraph text="* Once playoffs are created, all other games will be finalized, and you will not be able to change or edit their scores." />
      <p>Create playoffs</p>
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

      <div className="flex">
        {[...cratePlayOffMap(8)].map(([stage, teams], i) => {
          console.log("i", i);
          return (
            <div key={stage} className={classNames(i !== 0 && "ml-20", "")}>
              <div className="grid h-full place-content-center">
                {teams.map((p, index) => {
                  const c: CoordinatesType = {
                    start: `elem${i}${index}`,
                    end: `elem${i + 1}${Math.floor(index / 2)}`,
                  };

                  const isLast = index === teams.length - 1;
                  const isMiddle = index === Math.floor(teams.length / 2);

                  const isValidLine =
                    Math.floor(index / 2) < teams.length - 1 ||
                    index < teams.length - 1;

                  const marginBottom = `${Math.floor(i * 2 + 1)}rem`;
                  // : `${Math.floor(i + 1)}rem`;

                  console.log("marginBottom", marginBottom);

                  return (
                    <>
                      <div
                        id={c.start}
                        key={`${i}${stage}`}
                        className="mb-5 min-w-[10rem] border-2 px-4 py-2"
                        style={{
                          marginBottom: isLast ? "0" : marginBottom,
                        }}
                      >
                        <p>1: {p.team1}</p>
                        <p>2: {p.team2}</p>
                      </div>

                      {isValidLine && (
                        <Xarrow
                          end={c.end}
                          headSize={0}
                          start={c.start}
                          curveness={0.6}
                          path="grid"
                          strokeWidth={2}
                          color="#d1d5db"
                        />
                      )}
                    </>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </ModalWrap>
  );
};

export default CreatePlayOffModal;
