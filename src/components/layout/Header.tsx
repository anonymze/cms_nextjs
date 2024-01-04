import type { PropsWithChildren } from "react";
import Breadcrump from "../Breadcrump";

const Header: React.FC<PropsWithChildren & { breadcrump?: boolean }> = ({ children, breadcrump = true }) => {
  return (
    <header>
      {breadcrump && <Breadcrump />}
      <div className="flex justify-between items-center pb-lg">{children}</div>
    </header>
  );
};

export default Header;
