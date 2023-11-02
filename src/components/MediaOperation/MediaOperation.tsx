import { useRef } from 'react';
import { Trash2Icon } from 'lucide-react';
import { useFilesStore } from '@/contexts/store_files_context';
import { type FileTypeStore } from '@/contexts/store_files_context';
import './MediaOperation.css'

type Props = {
  fileTypeStore: FileTypeStore
}

const MediaOperation: React.FC<Props> = ({ fileTypeStore }) => {
  const setFiles = useFilesStore((state) => state.setFiles);
  const figureRef = useRef<HTMLElement>(null);

  const removeMedia = () => {
    const figureEelem = figureRef.current;
    const parentElem = figureEelem?.parentElement;

    if (!figureEelem || !parentElem) return;

    // we filter the children with hidden attributes, null means the attribute is not there
    const childrenCount = (Array.from(parentElem.children).filter((child) => child.getAttribute('hidden') === null)).length;

    if (childrenCount === 1) return setFiles([]);

    figureEelem.hidden = true;    
    // TODO retire le fichier du store
  }

  return (
    <figure onClick={removeMedia} ref={figureRef} className='media-operation'>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={fileTypeStore.base64} alt="" />
        <figcaption><Trash2Icon className='w-8 h-8' /></figcaption>
    </figure>
  )
}

export default MediaOperation 