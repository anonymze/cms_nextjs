import type { PropsWithChildren } from 'react';
import './SpinnerLoader.css';

const SpinnerLoader: React.FC<PropsWithChildren> = () => {
  return (
    <div className='w-full mx-auto relative'>
      <div className='loader-disney' role='status' aria-live="assertive"></div>
    </div>
  )
}

export { SpinnerLoader }