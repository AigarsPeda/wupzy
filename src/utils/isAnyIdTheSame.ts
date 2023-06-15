const isAnyIdTheSame = (
  firstTeamsIds: string[] | undefined,
  secondTeamsIds: string[] | undefined
) => {
  if (firstTeamsIds && secondTeamsIds) {
    for (let i = 0; i < firstTeamsIds.length; i++) {
      for (let j = 0; j < secondTeamsIds.length; j++) {
        if (firstTeamsIds[i] === secondTeamsIds[j]) {
          return true;
        }
      }
    }
  }
};

export default isAnyIdTheSame;
