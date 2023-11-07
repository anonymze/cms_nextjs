import type { PropsWithChildren } from "react";
import "./Loader.css";

const SpinnerLoader: React.FC<PropsWithChildren> = () => {
  return (
      <div className="spinner" role="status" aria-live="assertive"></div>
  );
};

export { SpinnerLoader };
