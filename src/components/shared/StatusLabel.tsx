type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function StatusLabel({ children, className = "" }: Props) {
  return (
    <span className={`label-code text-dirty-white/50 ${className}`}>
      {children}
    </span>
  );
}
