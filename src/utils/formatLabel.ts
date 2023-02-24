const formatLabel = (label: string) => {
  const words = label.split(/(?=[A-Z])/);
  return words.join(" ");
};

export default formatLabel;
