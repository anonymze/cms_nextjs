import type { PropsWithChildren } from "react";
import Breadcrump from "../Breadcrump";

export default function Header({ children, breadcrump = true }: PropsWithChildren & { breadcrump?: boolean }) {
  return (
    <header>
      {breadcrump && <Breadcrump />}
      <div className="flex justify-between items-center pb-lg">{children}</div>
    </header>
  );
};
