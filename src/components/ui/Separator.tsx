interface Props {}

const SeparatorHorizontal: React.FC<Props> = () => {
  return <hr />;
};

const SeparatorVertical: React.FC<Props> = () => {
  return <>|</>;
};

export { SeparatorHorizontal, SeparatorVertical };
