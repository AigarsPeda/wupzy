import { z } from "zod";

export const ParticipantsZodSchema = z.object({
  id: z.string(),
  name: z.string(),
  group: z.string(),
  points: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
  smallPoints: z.number(),
  tournamentId: z.string(),
});

export const TeamZodSchema = z.object({
  id: z.string(),
  name: z.string(),
  group: z.string(),
  points: z.number(),
  updatedAt: z.date(),
  createdAt: z.date(),
  smallPoints: z.number(),
  tournamentId: z.string(),
  participants: z.array(ParticipantsZodSchema),
});

export type TeamType = z.infer<typeof TeamZodSchema>;

export const TeamsMapZodSchema = z.map(z.string(), z.array(TeamZodSchema));

export type TeamsMapType = z.infer<typeof TeamsMapZodSchema>;

const ParticipantsMapZodSchema = z.map(
  z.string(),
  z.array(ParticipantsZodSchema)
);

export type ParticipantType = z.infer<typeof ParticipantsZodSchema>;
export type ParticipantMapType = z.infer<typeof ParticipantsMapZodSchema>;

export type ParticipantObjType = {
  first: ParticipantType[];
  second: ParticipantType[];
};

export type ChangeTeamsType = {
  oldGroup: string;
  newGroup: string;
  team: ParticipantType;
};

const TeamsAttendantZodSchema = z.object({
  name: z.string(),
});

export const TeamsAttendantMapZodSchema = z.map(
  z.string(),
  z.array(TeamsAttendantZodSchema)
);

export type TeamsAttendantType = z.infer<typeof TeamsAttendantZodSchema>;
export type TeamsAttendantMapType = z.infer<typeof TeamsAttendantMapZodSchema>;

export type AttendantType = TeamsAttendantType & {
  id: string;
};
