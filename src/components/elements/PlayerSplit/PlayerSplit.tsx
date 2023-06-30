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
import genUniqueId from "~/utils/genUniqueId";
import groupPlayerByGroup from "~/utils/groupPlayerByGroup";

const PlayerSplit: FC = () => {
  const { players, isLoading, tournamentId } = usePlayers();
  const [availableGroups, setAvailableGroups] = useState<string[]>([]);
  const [playersByGroup, setPlayersByGroup] = useState<PlayersMapType>(
    new Map<string, PlayerType[]>()
  );
  const { mutate } = api.player.splitPlayersInGroups.useMutation();

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
      <div className="flex w-full items-center justify-between">
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

      <GridLayout minWith="300">
        {Array.from(playersByGroup).map(([group, players]) => {
          const allKeys = Array.from(playersByGroup.keys());

          return (
            <div key={genUniqueId()} className="w-full overflow-x-auto">
              <div className="grid grid-cols-4 gap-4">
                <h2 className="text-3xl">{group}</h2>
              </div>
              <ul>
                {players.map((player) => {
                  return (
                    <li
                      key={genUniqueId()}
                      className="mb-2 grid grid-cols-12 gap-4 bg-slate-300"
                    >
                      <div className="col-span-3 flex items-center">
                        <p>{player.name}</p>
                      </div>
                      <div className="col-span-2 flex items-center">
                        <p className="text-xs font-semibold">Move to</p>
                      </div>
                      <div className="col-span-7 flex items-center space-x-2">
                        {allKeys.map((group) => {
                          if (group === player.group) return null;

                          return (
                            <div key={genUniqueId()} className="max-w-[5rem]">
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
            handleClick={() => {
              mutate({
                tournamentId,
                players: Array.from(playersByGroup.values()).flat(),
              });

              console.log(
                "Array.from(playersByGroup.values()).flat()",
                Array.from(playersByGroup.values()).flat()
              );

              console.log("split");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PlayerSplit;
