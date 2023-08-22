const updateGameOrder = <T extends { order: number }>(gamesShuffle: T[]) => {
  gamesShuffle.forEach((game, index) => {
    game.order = index + 1;
  });

  return gamesShuffle;
};

export default updateGameOrder;
