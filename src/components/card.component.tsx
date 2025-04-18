interface Props {
  children?: React.ReactNode;
  Id: string;
  ClassName?: string;
}

export const CardComponent = ({ children, Id, ClassName }: Props) => {
  return (
    <div
      data-identifier="card-component"
      className={`flex h-full min-h-screen w-full min-w-screen snap-center p-25`}
      id={Id}
    >
      <div
        className={`bg-bg-secondary shadow-shadow h-full w-full rounded-2xl p-8 shadow-[0px_0px_10px] ${ClassName}`}
      >
        {children}
      </div>
    </div>
  );
};
