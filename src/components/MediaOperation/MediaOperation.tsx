
import { useRef } from 'react';
import './MediaOperation.css'
import { Trash2Icon } from 'lucide-react';

type Props = {
  base64: string
}

const MediaOperation: React.FC<Props> = ({ base64 }) => {
  const figureRef = useRef<HTMLElement>(null);

  return (
    <figure ref={figureRef} onClick={() => figureRef.current?.remove()} className='media-operation'>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={base64} alt="" />
        <figcaption><Trash2Icon className='w-8 h-8' /></figcaption>
    </figure>
  )
}

export default MediaOperation 