// for dynamic icon (works well with nextjs because the data is streamed so the bundle size is not enormous)
import dynamicIconImports from 'lucide-react/dynamicIconImports';
import dynamic from "next/dynamic";
import { type LucideProps } from "lucide-react";

interface Props extends LucideProps {
  name: keyof typeof dynamicIconImports;
}

const IconDynamic: React.FC<Props> = async({ name, ...props }) => {
  const LucideIcon = dynamic(dynamicIconImports[name]);
  return <LucideIcon {...props} />;
};

export default IconDynamic;
