import Breadcrump from "../Breadcrump";
import type { PropsWithChildren } from "react";

export default function Header({ children, breadcrump = true }: PropsWithChildren & { breadcrump?: boolean }) {
  return (
    <header>
      {breadcrump && <Breadcrump />}
      <div className="flex justify-between items-center pb-lg">{children}</div>
    </header>
  );
};
