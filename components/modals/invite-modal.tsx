'use client';

import { useModal } from '@/hooks/use-modal-store';
import { useOrigin } from '@/hooks/use-origin';
import axios from 'axios';
import { Check, Copy, RefreshCw } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

const InviteModal = () => {
	const { onOpen, isOpen, onClose, data, type } = useModal();
	const origin = useOrigin();

	const isModalOpen = isOpen && type === 'invite';
	const { server } = data;

	const inviteUrl = `${origin}/invite/${server?.inviteCode}`;

	const [copied, setCopied] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const onCopy = () => {
		navigator.clipboard.writeText(inviteUrl);
		setCopied(true);

		setTimeout(() => {
			setCopied(false);
		}, 1000);
	};

	const onNew = async () => {
		try {
			setIsLoading(true);
			const res = await axios.patch(`/api/servers/${server?.id}/invite-code`);

			onOpen('invite', { server: res.data });
		} catch (err) {
			console.log(err);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Dialog
			open={isModalOpen}
			onOpenChange={onClose}
		>
			<DialogContent className='bg-white text-black p-0 overflow-hidden'>
				<DialogHeader className='pt-8 px-6'>
					<DialogTitle className='text-2xl text-center font-bold'>Invite Friends</DialogTitle>
				</DialogHeader>
				<div className='p-6'>
					<Label className='uppercase text-xs font-bold text-zinc-500 dark:text-secondary/80'>Server invite link</Label>
					<div className='flex items-center mt-2 gap-x-2'>
						<Input
							disabled={isLoading}
							className='bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0'
							value={inviteUrl}
						/>
						<Button
							disabled={isLoading}
							size={'icon'}
							onClick={onCopy}
						>
							{copied ? <Check /> : <Copy className='w-4 h-4' />}
						</Button>
					</div>
					<Button
						onClick={onNew}
						disabled={isLoading}
						variant={'link'}
						size='sm'
						className='text-xs text-zinc-500 mt-4'
					>
						Generate a new link
						<RefreshCw className='w-4 h-4 ml-2' />
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default InviteModal;
