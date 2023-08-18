import { useAutoAnimate } from "@formkit/auto-animate/react";
import { ALPHABET } from "hardcoded";
import { useEffect, useState, type FC } from "react";
import Button from "~/components/elements/Button/Button";
import SmallButton from "~/components/elements/SmallButton/SmallButton";
import GridLayout from "~/components/layout/GridLayout/GridLayout";
import usePlayers from "~/hooks/usePlayers";
import { type PlayerType } from "~/types/tournament.types";
import { type PlayersMapType } from "~/types/utils.types";
import { api } from "~/utils/api";
import changePlayersGroup from "~/utils/changePlayersGroup";
import classNames from "~/utils/classNames";
import getUniqueId from "~/utils/getUniqueId";
import groupPlayerByGroup from "~/utils/groupPlayerByGroup";

interface PlayerSplitProps {
  handleModalClose: () => void;
}

const PlayerSplit: FC<PlayerSplitProps> = ({ handleModalClose }) => {
  const [parent] = useAutoAnimate();
  const { players, isLoading, tournamentId } = usePlayers();
  const [availableGroups, setAvailableGroups] = useState<string[]>([]);
  const [playersByGroup, setPlayersByGroup] = useState<PlayersMapType>(
    new Map<string, PlayerType[]>()
  );
  const {
    game: invalidateGames,
    teams: invalidateTeams,
    player: invalidatePlayers,
  } = api.useContext();
  const { mutate, isLoading: isSplitting } =
    api.player.splitPlayersInGroups.useMutation({
      onSuccess: () => {
        void invalidateGames.invalidate();
        void invalidateTeams.invalidate();
        void invalidatePlayers.invalidate();
        handleModalClose();
      },
    });

  const addGroup = () => {
    const newGroup = availableGroups[0];

    if (!newGroup) return;

    const newPlayersByGroup = new Map(playersByGroup);
    newPlayersByGroup.set(newGroup, []);
    setPlayersByGroup(newPlayersByGroup);
    setAvailableGroups(availableGroups.slice(1));
  };

  useEffect(() => {
    if (!players || isLoading) return;

    const { groups, playersMap } = groupPlayerByGroup(players);

    setAvailableGroups(() => {
      const availableGroups = ALPHABET.filter(
        (letter) => !groups.includes(letter)
      );
      return availableGroups;
    });

    setPlayersByGroup(playersMap);
  }, [isLoading, players]);

  return (
    <div className="w-full">
      <div className="mb-4 flex w-full items-center justify-between">
        <div className="w-full">
          <p className="font-primary text-red-600">
            * Splitting the tournament in groups will result in a reset of all
            scores and matches.
          </p>
        </div>
        <div>
          <SmallButton title="Add group" color="green" handleClick={addGroup} />
        </div>
      </div>

      <GridLayout minWith="300" ref={parent} isGap>
        {Array.from(playersByGroup).map(([group, players]) => {
          const allKeys = Array.from(playersByGroup.keys());

          return (
            <div
              key={getUniqueId()}
              className="w-full overflow-x-auto rounded border border-gray-200 p-2 shadow-md"
            >
              <div className="mb-4 grid grid-cols-12 gap-4">
                <h2 className="col-span-3 text-4xl">{group}</h2>
                <div className="col-span-2 flex items-center">
                  <p className="text-xs font-semibold">Move to</p>
                </div>
              </div>

              <ul className="">
                {players.map((player, i) => {
                  return (
                    <li
                      key={getUniqueId()}
                      className={classNames(
                        i !== players.length - 1 &&
                          "mb-2 border-b border-gray-200",
                        "grid grid-cols-12 gap-4 pb-2"
                      )}
                    >
                      <div className="col-span-3 flex items-center">
                        <p>{player.name}</p>
                      </div>

                      <div className="col-span-7 flex items-center space-x-2">
                        {allKeys.map((group) => {
                          if (group === player.group) return null;

                          return (
                            <div key={getUniqueId()} className="max-w-[5rem]">
                              <SmallButton
                                title={group}
                                isFullWidth
                                color="gray"
                                handleClick={() => {
                                  const newPlayersByGroup = changePlayersGroup({
                                    group,
                                    player,
                                    playersByGroup,
                                  });

                                  setPlayersByGroup(newPlayersByGroup);
                                }}
                              />
                            </div>
                          );
                        })}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </GridLayout>

      <div className="flex justify-end">
        <div>
          <Button
            title="Split"
            isLoading={isSplitting}
            handleClick={() => {
              mutate({
                tournamentId,
                players: Array.from(playersByGroup.values()).flat(),
              });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PlayerSplit;
