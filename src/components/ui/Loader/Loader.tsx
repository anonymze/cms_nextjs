import type { PropsWithChildren } from "react";
import "./Loader.css";

const SpinnerLoader: React.FC<PropsWithChildren> = () => {
  return (
    <div className="text-center" role="status" aria-live="assertive">
      <span className="spinner"></span>
    </div>
  );
};

export { SpinnerLoader };
