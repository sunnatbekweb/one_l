interface Count {
  icon: React.ReactElement;
  count: number | undefined;
}

export const Counts: React.FC<Count> = ({ icon, count }) => {
  return (
    <div className="flex gap-2 items-center font-medium">
      {icon}
      <span>{count}</span>
    </div>
  );
};
