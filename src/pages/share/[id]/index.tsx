import DisplaySetScore from "components/elements/DisplaySetScore/DisplaySetScore";
import DisplayTeams from "components/elements/DisplayTeams/DisplayTeams";
import getWinsPerTeam from "components/elements/GroupCard/utils/getWinsPerTeam";
import GroupParticipantCard from "components/elements/GroupParticipantCard/GroupParticipantCard";
import GroupTeamsCard from "components/elements/GroupTeamsCard/GroupTeamsCard";
import Logo from "components/elements/Logo/Logo";
import GridLayout from "components/layouts/GridLayout/GridLayout";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import type { GamesType } from "types/game.types";
import { GameSets } from "types/game.types";
import type { TeamsMapType } from "types/team.types";
import { api } from "utils/api";
import classNames from "utils/classNames";
import createMap from "utils/createMap";

const Share: NextPage = () => {
  const { query } = useRouter();
  const [shareId, setShareId] = useState("");
  const [teamMap, setTeamMap] = useState<TeamsMapType>(new Map());
  const { data } = api.shareLink.getShareTournament.useQuery(
    { shareLinkId: shareId },
    { enabled: !!shareId }
  );

  useEffect(() => {
    if (!query.id || typeof query.id !== "string") return;

    setShareId(query.id);
  }, [query.id]);

  useEffect(() => {
    if (data?.shareTournament) {
      setTeamMap(createMap(data?.shareTournament.tournament.team));
    }
  }, [data?.shareTournament]);

  return (
    <div>
      <div className="mb-5 transition-all md:mb-10">
        <Logo />
      </div>
      <GridLayout isGap minWith="350">
        {[...createMap(data?.shareTournament.tournament.games ?? [])].map(
          ([group, games]) => {
            const teams = teamMap.get(group);

            if (!teams) return null;

            return (
              <div key={group}>
                <p className="mb-5 font-primary text-3xl">{group} - group</p>
                {games.map((game, i) => {
                  const gameOrder = i + 1;
                  const gameCount = games.length;
                  const gameSets = game?.gameSets;
                  const finishedGames = gameSets
                    ? GameSets.parse(gameSets)
                    : {};
                  const { firstTeamWins, secondTeamWins } =
                    getWinsPerTeam(finishedGames);

                  // get next game that is not finished
                  const nextGame = games.find((game) => {
                    const gameSets = game?.gameSets;
                    const finishedGames = gameSets
                      ? GameSets.parse(gameSets)
                      : {};
                    const { firstTeamWins, secondTeamWins } =
                      getWinsPerTeam(finishedGames);

                    const isFinished =
                      firstTeamWins ===
                        data?.shareTournament.tournament.setsInGame ||
                      secondTeamWins ===
                        data?.shareTournament.tournament.setsInGame;

                    return !isFinished;
                  });

                  return (
                    <li
                      key={game.id}
                      className={classNames(
                        nextGame?.id === game.id && "bg-gray-800 text-white",
                        "mb-2 flex rounded-md bg-gray-100 px-2 py-2"
                      )}
                    >
                      <div className={classNames("w-full md:flex")}>
                        <div className="flex w-full">
                          <div
                            className={classNames(
                              "mr-2 w-[3rem] border-b-2 md:mr-3 md:w-[5rem] md:border-b-0 md:border-r-2 md:px-2"
                            )}
                          >
                            <p className="pb-1 text-xs">{`${gameOrder} of ${gameCount}`}</p>
                          </div>

                          <div className="mr-2 w-[50%] truncate">
                            <DisplayTeams
                              team={game.team1.participants}
                              isCurrentGame={nextGame?.id === game.id}
                              infoScore={firstTeamWins.toString()}
                              teamName={
                                data?.shareTournament.tournament.type ===
                                "TEAMS"
                                  ? game.team1.name
                                  : undefined
                              }
                            />
                          </div>
                          <div className="w-[50%] truncate">
                            <DisplayTeams
                              team={game.team2.participants}
                              isCurrentGame={nextGame?.id === game.id}
                              infoScore={secondTeamWins.toString()}
                              teamName={
                                data?.shareTournament.tournament.type ===
                                "TEAMS"
                                  ? game.team2.name
                                  : undefined
                              }
                            />
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <div className="w-full max-w-[5.5rem]">
                            <DisplaySetScore game={game as GamesType} />
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}

                <div className="mt-5 w-full md2:mt-10">
                  {data?.shareTournament.tournament.type === "TEAMS" ? (
                    <GroupTeamsCard teams={teams} />
                  ) : (
                    <GroupParticipantCard
                      participants={
                        data?.shareTournament.tournament.teams || []
                      }
                    />
                  )}
                </div>
              </div>
            );
          }
        )}
      </GridLayout>
    </div>
  );
};

export default Share;
