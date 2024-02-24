"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/utils/libs/tailwind/helper";
import { Button } from "./ui/Button";
import { ArrowLeft } from "lucide-react";

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
	const pathnames = removeLangCrumb ? usePathname().split("/").filter(Boolean).slice(1) : usePathname().split("/").filter(Boolean);

	//  if pathnames has less than 2 entry, we just show an arrow which goes back
	if (pathnames.length < 2) {
		return (
			<Button
				onClick={() => router.back()}
				outline={false}
				fill={false}
				className="mb-3 ml-[-1rem]"
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
					<Link
						title={convertPathnameToReadableString(pathname)}
						className={cn("inline-block max-w-32 pr-[0.5px] truncate align-bottom first-letter:uppercase lg:max-w-40", {
							underline: idx === currentIdxPathname,
						})}
						href={constructURL(pathnames, idx)}
					>
						{convertPathnameToReadableString(pathname)}
					</Link>
				</React.Fragment>
			))}
		</div>
	);
};

export default Breadcrump;
