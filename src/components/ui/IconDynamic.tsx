// for dynamic icon (works well with nextjs because the data is streamed so the bundle size is not enormous)
import { icons } from "lucide-react";
import { type LucideProps } from "lucide-react";

interface Props extends LucideProps {
  name: keyof typeof icons;
}

export default function IconDynamic({ name, ...props }: Props) {
  const LucideIcon = icons[name];
  return <LucideIcon {...props} />;
}