"use client";

import React, { useContext } from "react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/utils/libs/tailwind/helper";
import { Button } from "./Button";
import { ArrowLeft } from "lucide-react";
import { LangContext } from "@/utils/providers";
import { ProgressLink } from "./progress-bar/ProgressBar";

const convertPathnameToReadableString = (pathname: string) => {
	return pathname.replaceAll("-", " ");
};

const constructURL = (pathnames: string[], currentIndex: number) => {
	let url = "";

	for (let i = 0; i <= currentIndex; i++) {
		url += `/${pathnames[i]}`;
	}

	return url;
};

const Breadcrump: React.FC<{ removeLangCrumb?: boolean }> = ({ removeLangCrumb = true}) => {
	const router = useRouter();
	const lang = useContext(LangContext);
	const pathnames = removeLangCrumb ? usePathname().split("/").filter(Boolean).slice(1) : usePathname().split("/").filter(Boolean);

	//  if pathnames has less than 2 entry, we just show an arrow which goes back
	if (pathnames.length < 2) {
		return (
			<Button
				onClick={() => router.back()}
				outline={false}
				fill={false}
				className="mb-[0.3rem] ml-[-1rem] mt-[-0.5rem]"
			>
				<ArrowLeft className="w-5 h-5" />
			</Button>
		);
	}

	const currentIdxPathname = pathnames.length - 1;

	return (
		<div className="mb-3 text-sm italic" role="navigation">
			{pathnames.map((pathname, idx) => (
				<React.Fragment key={pathname}>
					{"  -  "}
					<ProgressLink
						title={convertPathnameToReadableString(pathname)}
						className={cn("inline-block max-w-32 pr-[0.5px] truncate align-bottom first-letter:uppercase lg:max-w-40", {
							underline: idx === currentIdxPathname,
						})}
					  href={`/${lang}/${constructURL(pathnames, idx)}`}
					>
						{convertPathnameToReadableString(pathname)}
					</ProgressLink>
				</React.Fragment>
			))}
		</div>
	);
};

export default Breadcrump;
