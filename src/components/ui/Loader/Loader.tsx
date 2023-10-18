import type { PropsWithChildren } from 'react';
import './Loader.css';

const SpinnerLoader: React.FC<PropsWithChildren> = () => {
  return (
    <div className='relative w-full mx-auto'>
      <div className="loader-disney" role='status' aria-live="assertive"></div>
    </div>
  )
}

export { SpinnerLoader }