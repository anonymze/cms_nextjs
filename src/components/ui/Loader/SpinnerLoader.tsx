import './SpinnerLoader.css';

interface Props {}

const SpinnerLoader: React.FC<Props> = () => {
  return (
    <div className='w-full mx-auto relative'>
      <div className='loader-disney' role='status' aria-live="assertive"></div>
    </div>
  )
}

export default SpinnerLoader