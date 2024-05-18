import { ProgressLink } from "./progress-bar/ProgressBar";

interface Props {
	title: string;
	redirect: string;
}

const CardContentManager: React.FC<Props> = ({ title, redirect }) => {
	return (
		<ProgressLink
			href={redirect}
			className="flex items-center w-full h-40 border-2 border-primary rounded-xl cursor-pointer md:w-1/2"
		>
			<h2 className="w-full text-center">{title}</h2>
		</ProgressLink>
	);
};

export { CardContentManager };
