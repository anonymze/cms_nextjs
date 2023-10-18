import type { PropsWithChildren } from 'react';
import './Skeleton.css';
import { cn } from '@/utils/libs/utils';

type PropsSkeleton = PropsWithChildren & { animated?: boolean };

const SkeletonCard: React.FC<PropsSkeleton> = ({ animated }) => {
  return (
    <div className={cn("background-skeleton", { animated: animated ? true : false })} aria-hidden="true">
    </div>
  )
}

const SkeletonPage: React.FC<PropsSkeleton> = ({ animated }) => {
  return (
    <div className={cn("background-skeleton", { animated: animated ? true : false })} aria-hidden="true">
    </div>
  )
}

export {
  SkeletonCard,
  SkeletonPage
}