"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
  const pathnames = usePathname().split("/").filter(Boolean);

  //  if pathnames has less than 2 entry, we don't show the breadcrump
  if (pathnames.length < 2) {
    return null;
  }

  return (
    <div className="mb-3 text-sm italic" role="breadcrump">
      {pathnames.map((pathname, idx) => (
        <React.Fragment key={idx}>
          {" - "}
          <Link className="underline" href={constructURL(pathnames, idx)}>
            {convertPathnameToReadableString(pathname)}
          </Link>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Breadcrump;
