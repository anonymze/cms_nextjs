import type { PropsWithChildren } from "react";

const Header: React.FC<PropsWithChildren> = ({ children }) => {
  return <header className="flex justify-between items-center pb-lg">{children}</header>;
};

export default Header;
