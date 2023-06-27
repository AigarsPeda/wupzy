import { useEffect, useState, type FC } from "react";
import ModalLayout from "~/components/layout/ModalLayout/ModalLayout";
import useTeams from "~/hooks/useTeams";
import { type TeamType } from "~/types/tournament.types";
import genUniqueId from "~/utils/genUniqueId";
import groupTeamsByGroup from "~/utils/groupTeamsByGroup";

type TeamsMapType = Map<string, TeamType[]>;

interface SplitTournamentModalProps {
  isSplitModal: boolean;
  handleCancelClicks: () => void;
}

const SplitTournamentModal: FC<SplitTournamentModalProps> = ({
  isSplitModal,
  handleCancelClicks,
}) => {
  const { teams, isLoading } = useTeams(isSplitModal);
  const [teamsByGroup, setTeamsByGroup] = useState<TeamsMapType>(
    new Map<string, TeamType[]>()
  );

  useEffect(() => {
    if (!teams || isLoading) return;

    setTeamsByGroup(groupTeamsByGroup(teams));
  }, [teams, isLoading]);

  return (
    <ModalLayout
      isFullScreen
      isModalVisible={isSplitModal}
      handleCancelClick={handleCancelClicks}
      header={
        <div className="mb-4">
          <h1 className="text-3xl">Split tournament</h1>
        </div>
      }
    >
      <div className="w-72 px-3 pb-2 text-left md:w-full md:max-w-[28rem] md:px-6 md:pb-4">
        <p className="mb-8 mt-5 font-primary">
          Are you sure you want to split this tournament?{" "}
        </p>
      </div>
      <div>
        {Array.from(teamsByGroup).map(([group, teams]) => (
          <div key={genUniqueId()}>
            <h2 className="text-3xl">{group}</h2>
            <ul>
              {teams.map((team) => {
                console.log(team);
                return <li key={genUniqueId()}>{team.name}</li>;
              })}
            </ul>
          </div>
        ))}
      </div>
    </ModalLayout>
  );
};

export default SplitTournamentModal;
