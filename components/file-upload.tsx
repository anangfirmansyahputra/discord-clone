'use client';

import { X } from 'lucide-react';
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
