import { AiOutlinePartition } from "react-icons/ai";
import { BsLayoutSplit } from "react-icons/bs";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";

export type CommandType =
  | "CreatePlayoffs"
  | "EditTournament"
  | "DeleteTournament"
  | "DivideIntoGroups";

type SettingOptionType = {
  id: string;
  title: string;
  action: string;
  icon: JSX.Element;
  isDanger: boolean;
  isProOnly: boolean;
  command: CommandType;
  availableFor: ("king" | "teams")[];
};

export const SETTING_OPTION: SettingOptionType[] = [
  {
    id: "1",
    title: "Edit tournament",
    action: "Edit",
    icon: <FiEdit2 className="mr-3 h-5" />,
    command: "EditTournament",
    isProOnly: false,
    isDanger: false,
    availableFor: ["king", "teams"],
  },
  {
    id: "2",
    title: "Dividing it into groups",
    action: "Edit",
    icon: <BsLayoutSplit className="mr-3 h-4 " />,
    command: "DivideIntoGroups",
    isProOnly: true,
    isDanger: false,
    availableFor: ["king", "teams"],
  },
  {
    id: "3",
    title: "Create playoffs",
    action: "Edit",
    icon: <AiOutlinePartition className="mr-3 h-5" />,
    command: "CreatePlayoffs",
    isProOnly: true,
    isDanger: false,
    availableFor: ["teams"],
  },
  {
    id: "4",
    action: "Delete",
    title: "Delete tournament",
    icon: <RiDeleteBin6Line className="mr-3" />,
    command: "DeleteTournament",
    isProOnly: false,
    isDanger: true,
    availableFor: ["king", "teams"],
  },
];
