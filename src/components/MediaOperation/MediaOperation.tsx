"use client"

import { Trash2Icon } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteUploadQuery } from '@/api/uploadQueries';
import './MediaOperation.css'
import type { Upload } from '@/types/upload';
import { type HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLElement> {
	removeFileFromApi: Upload["uuid"] | false
}

const MediaOperation: React.FC<Props> = ({ removeFileFromApi, children, ...props }) => {
	const queryClient = useQueryClient();

	const mutationDelete = useMutation({
		mutationFn: deleteUploadQuery,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['uploads'] })
	})

	return (
		<figure onClick={() => {
			if (!removeFileFromApi) return;
			mutationDelete.mutate(removeFileFromApi)					
		}} className='media-operation' {...props}>
				{children}
				<figcaption><Trash2Icon className='w-8 h-8' /></figcaption>
		</figure>
	)
}

export default MediaOperation 