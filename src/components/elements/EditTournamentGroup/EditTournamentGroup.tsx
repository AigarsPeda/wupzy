import EditModalContainer from "components/containers/EditModalContainer/EditModalContainer";
import EditParticipantTeamsCard from "components/elements/EditParticipantTeamsCard/EditParticipantTeamsCard";
import EditParticipantTournamentCard from "components/elements/EditParticipantTournamentCard/EditParticipantTournamentCard";
import useParticipants from "hooks/useParticipants";
import useTournament from "hooks/useTournament";
import useWindowSize from "hooks/useWindowSize";
import type { FC } from "react";
import { useState } from "react";
import type { ParticipantType, TeamType } from "types/team.types";

export type EditType =
  | ""
  | "addTeam"
  | "editTeam"
  | "editGameOrder"
  | "addParticipant"
  | "editParticipant";

export type EditGroupType = {
  group: string;
  team?: TeamType;
  editType: EditType;
  participant?: ParticipantType;
};

interface EditTournamentGroupProps {
  tournamentId: string;
}

const EditTournamentGroup: FC<EditTournamentGroupProps> = ({
  tournamentId,
}) => {
  const { windowSize } = useWindowSize();
  const { tournament } = useTournament(tournamentId);
  const { refetchParticipants } = useParticipants(tournamentId);
  const [selectedEdit, setSelectedEdit] = useState<EditGroupType>({
    group: "",
    editType: "",
  });

  return (
    <>
      <div
        style={
          windowSize.width && windowSize.width > 650
            ? { maxHeight: "calc(100vh - 17rem)" }
            : { maxHeight: "calc(100vh - 14rem)" }
        }
      >
        {tournament?.tournament.type === "KING" && (
          <EditParticipantTournamentCard
            tournamentId={tournamentId}
            setSelectedEdit={(group, type, participant) => {
              setSelectedEdit((state) => {
                if (state.group === group) {
                  return { participant, group: "", editType: "" };
                }
                return { group, participant, editType: type };
              });
            }}
          />
        )}

        {tournament?.tournament.type === "TEAMS" && (
          <EditParticipantTeamsCard
            tournamentId={tournamentId}
            setSelectedEdit={(group, type, team) => {
              setSelectedEdit((state) => {
                if (state.group === group) {
                  return { group: "", editType: "" };
                }
                return { team, group, editType: type };
              });
            }}
          />
        )}

        <EditModalContainer
          tournamentId={tournamentId}
          selectedEdit={selectedEdit}
          handleCancelClick={() => {
            setSelectedEdit({ group: "", editType: "" });
            refetchParticipants().catch((err) => {
              console.error("Error refetching participants: ", err);
            });
          }}
        />
      </div>
    </>
  );
};

export default EditTournamentGroup;
