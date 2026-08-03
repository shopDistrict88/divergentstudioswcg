type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function CodeLabel({ children, className = "" }: Props) {
  return (
    <span className={`label-code text-dirty-white/70 ${className}`}>
      {children}
    </span>
  );
}
