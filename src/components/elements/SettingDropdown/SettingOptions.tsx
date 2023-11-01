import { AiOutlinePartition, AiOutlinePlus } from "react-icons/ai";
import { BsLayoutSplit } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";

export type CommandType =
  | "CreatePlayoffs"
  | "DeleteTournament"
  | "DivideIntoGroups"
  | "AddRemoveParticipant";

type SettingOptionType = {
  id: string;
  title: string;
  action: string;
  icon: JSX.Element;
  isProOnly: boolean;
  command: CommandType;
};

export const SETTING_OPTION: SettingOptionType[] = [
  {
    id: "1",
    title: "Add / Remove participant",
    action: "Edit",
    icon: <AiOutlinePlus className="mr-3 h-5" />,
    command: "AddRemoveParticipant",
    isProOnly: false,
  },
  {
    id: "2",
    title: "Dividing it into groups",
    action: "Edit",
    icon: <BsLayoutSplit className="mr-3 h-4 " />,
    command: "DivideIntoGroups",
    isProOnly: true,
  },
  {
    id: "3",
    title: "Create playoffs",
    action: "Edit",
    icon: <AiOutlinePartition className="mr-3 h-5" />,
    command: "CreatePlayoffs",
    isProOnly: true,
  },
  {
    id: "4",
    action: "Delete",
    title: "Delete tournament",
    icon: <RiDeleteBin6Line className="mr-3" />,
    command: "DeleteTournament",
    isProOnly: false,
  },
];
