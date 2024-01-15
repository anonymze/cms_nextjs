import { usePathname, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from "./Pagination";
import { useMemo } from "react";

export function PaginationComponent() {
  // we do this because useSearchParams() is read-only
  const searchParams = new URLSearchParams(useSearchParams());
  const currentUrl = usePathname();
  let currentPage = parseInt(searchParams.get("page") || "1");
  if (isNaN(currentPage)) currentPage = 1;

  // pages["0"] means current page, pages["1"] means next page, pages["-1"] means previous page
  const pages = {
    "0": currentPage < 1 ? 1 : currentPage,
    "1": currentPage < 1 ? 2 : currentPage + 1,
    "-1": currentPage < 1 ? 0 : currentPage - 1,
  };

  const createPageLink = useMemo(() => {
    return (page: "next" | "secondNext" | "current" | "previous" ) => {
      switch (page) {
        case "next":
          searchParams.set("page", String(pages["1"]));
          break;
        case "current":
          searchParams.set("page", String(pages["0"]));
          break;
        case "previous":
          searchParams.set("page", String(pages["-1"]));
          break;
      }

      return `${currentUrl}?${searchParams.toString()}`;
    };
  }, [searchParams, currentUrl]);

  return (
    <div className="py-5">
      <Pagination>
        <PaginationContent>
          <PaginationPrevious isDisabled={pages[0] <= 1} href={createPageLink("previous")} />
          <PaginationLink isDisabled={pages[0] <= 1} href={createPageLink("previous")}>{pages["-1"]}</PaginationLink>
          <PaginationLink href={createPageLink("current")} isActive>
            {pages["0"]}
          </PaginationLink>
          <PaginationLink href={createPageLink("next")}>{pages["1"]}</PaginationLink>
          {/* <PaginationEllipsis /> */}
          <PaginationNext href={createPageLink("next")} />
        </PaginationContent>
      </Pagination>
    </div>
  );
}
