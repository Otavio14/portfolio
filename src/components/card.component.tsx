interface Props {
  children?: React.ReactNode;
  Id: string;
}

export const CardComponent = ({ children, Id }: Props) => {
  return (
    <div
      data-identifier="card-component"
      className={`flex h-full min-h-screen w-full min-w-screen snap-center p-8`}
      id={Id}
    >
      <div
        className={`h-full w-full rounded-2xl bg-[#1E1C1C] shadow-[0px_0px_10px] shadow-white`}
      >
        {children}
      </div>
    </div>
  );
};
