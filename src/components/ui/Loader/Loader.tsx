import type { PropsWithChildren } from "react";
import "./Loader.css";
import { Loader2 } from "lucide-react";

const SpinnerLoader: React.FC<PropsWithChildren> = () => {
  return (
    <div className="text-center" role="status" aria-live="assertive">
      {/* rotate animation */}
      <Loader2 className="mx-auto animate-rotate" />
    </div>
  );
};

export { SpinnerLoader };
