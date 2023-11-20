const copyToClipboard = (str: string, calBack?: () => void) => {
  navigator.clipboard
    .writeText(str)
    .then(() => {
      calBack && calBack();
    })
    .catch((err) => {
      console.error(err);
    });
};

export default copyToClipboard;
