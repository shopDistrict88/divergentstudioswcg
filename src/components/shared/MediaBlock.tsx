type Props = {
  label?: string;
  className?: string;
  ratio?: string;
};

export default function MediaBlock({
  label = "IMAGE PENDING",
  className = "",
  ratio = "aspect-[3/4]",
}: Props) {
  return (
    <div className={`media-pending relative ${ratio} ${className}`}>
      {label}
    </div>
  );
}
