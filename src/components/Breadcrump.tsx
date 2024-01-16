"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/utils/libs/tailwind/merge";
import { Button } from "./ui/Button";
import { ArrowBigLeft, ArrowLeft } from "lucide-react";

const convertPathnameToReadableString = (pathname: string) => {
  return pathname.replaceAll("-", " ").replace(/^./, pathname[0]!.toUpperCase());
};

const constructURL = (pathnames: string[], currentIndex: number) => {
  let url = "";

  for (let i = 0; i <= currentIndex; i++) {
    url += "/" + pathnames[i];
  }

  return url as __next_route_internal_types__.RouteImpl<string>;
};

const Breadcrump: React.FC = () => {
  const router = useRouter();
  const pathnames = usePathname().split("/").filter(Boolean);

  //  if pathnames has less than 2 entry, we just show an arrow which goes back
  if (pathnames.length < 2) {
    return (
      <Button onClick={() => router.back()} outline={false} fill={false} className="mb-3 ml-[-1rem]">
        <ArrowLeft className="w-5 h-5" />
      </Button>
    );
  }

  const currentIdxPathname = pathnames.length - 1;

  return (
    <div className="mb-3 text-sm italic" role="breadcrump">
      {pathnames.map((pathname, idx) => (
        <React.Fragment key={idx}>
          {" - "}
          <Link className={cn({ underline: idx === currentIdxPathname })} href={constructURL(pathnames, idx)}>
            {convertPathnameToReadableString(pathname)}
          </Link>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Breadcrump;
