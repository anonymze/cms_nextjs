import { useRef } from 'react';
import { Trash2Icon } from 'lucide-react';
import { useFilesStore } from '@/contexts/store_files_context';
import { type FileTypeStore } from '@/contexts/store_files_context';
import './MediaOperation.css'

type Props = {
  fileTypeStore: FileTypeStore
}

const MediaOperation: React.FC<Props> = ({ fileTypeStore }) => {
  // remove file from context
  const removeFile = useFilesStore((state) => state.removeFile);
  const figureRef = useRef<HTMLElement>(null);

  return (
    <figure onClick={() => removeFile(fileTypeStore.file)} ref={figureRef} className='media-operation'>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={fileTypeStore.base64} alt="" />
        <figcaption><Trash2Icon className='w-8 h-8' /></figcaption>
    </figure>
  )
}

export default MediaOperation 