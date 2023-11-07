import Link from "next/link";

interface Props {
  title: string;
  redirect: __next_route_internal_types__.RouteImpl<string>;
}

const CardContentManager: React.FC<Props> = ({ title, redirect }) => {
  return (
    <Link href={redirect} className="flex items-center w-full h-40 border-2 border-primary rounded-xl cursor-pointer md:w-1/2">
      <h2 className="w-full text-center">{title}</h2>
    </Link>
  );
};

export { CardContentManager };
