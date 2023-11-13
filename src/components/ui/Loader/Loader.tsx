import type { PropsWithChildren } from "react";
import "./Loader.css";
import { cn } from "@/utils/libs/shadcn";

const SpinnerLoader: React.FC<PropsWithChildren & { large?: boolean }> = ({ large = false }) => {
  return (
    <div className="text-center" role="status" aria-live="assertive">
      <span className={cn("spinner", large ? "large" : "")}></span>
    </div>
  );
};

export { SpinnerLoader };
