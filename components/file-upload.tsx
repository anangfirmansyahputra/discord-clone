'use client';

import { FileIcon, X } from 'lucide-react';
import { UploadDropzone } from '@/lib/uploadthing';

import '@uploadthing/react/styles.css';
import Image from 'next/image';

interface Props {
	onChange: (url?: string) => void;
	value: string;
	endpoint: 'messageFile' | 'serverImage';
}

const FileUpload: React.FC<Props> = ({ endpoint, onChange, value }) => {
	const fileType = value?.split('.').pop();

	if (value && fileType !== 'pdf') {
		return (
			<div className='relative w-20 h-20'>
				<Image
					fill
					src={value}
					alt='upload'
					className='rounded-full'
				/>
				<button
					onClick={() => {}}
					className='bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm hover:bg-rose-500/90'
					type='button'
				>
					<X className='w-4 h-4' />
				</button>
			</div>
		);
	}

	if (value && fileType === 'pdf') {
		return (
			<div className='relative flex items-center p-2 mt-2 rounded-md bg-background/10'>
				<FileIcon className='h-10 w-10 fill-indigo-200 stroke-indigo-400' />
				<a
					href={value}
					target='_blank'
					rel='noopener noreferrer'
					className='ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline'
				>
					{value}
				</a>
				<button
					onClick={() => {}}
					className='bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-2 shadow-sm hover:bg-rose-500/90'
					type='button'
				>
					<X className='w-4 h-4' />
				</button>
			</div>
		);
	}

	return (
		<UploadDropzone
			endpoint={endpoint}
			onClientUploadComplete={(res) => {
				onChange(res?.[0].url);
			}}
			onUploadError={(err: Error) => {
				console.log(err);
			}}
		/>
	);
};

export default FileUpload;
