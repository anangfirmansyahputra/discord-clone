'use client';

import { useModal } from '@/hooks/use-modal-store';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import FileUpload from '../file-upload';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { useEffect } from 'react';

const formSchema = z.object({
	name: z.string().min(1, {
		message: 'Server name is required',
	}),
	imageUrl: z.string().min(1, {
		message: 'Server image is required',
	}),
});

const EditServerModal = () => {
	const { isOpen, onClose, onOpen, type, data } = useModal();
	const { server } = data;

	const router = useRouter();

	const isModalOpen = isOpen && type === 'editServer';

	const form = useForm({
		defaultValues: {
			name: '',
			imageUrl: '',
		},
		resolver: zodResolver(formSchema),
	});

	const isLoading = form.formState.isSubmitting;

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			const res = await axios.patch(`/api/servers/${server?.id}`, values);

			form.reset();
			router.refresh();
			onClose();
		} catch (err: any) {
			console.log(err);
		}
	};

	const handleClose = () => {
		form.reset();
		onClose();
	};

	useEffect(() => {
		if (server) {
			form.setValue('name', server.name);
			form.setValue('imageUrl', server.imageUrl);
		}
	}, [server, form]);

	return (
		<Dialog
			open={isModalOpen}
			onOpenChange={handleClose}
		>
			<DialogContent className='bg-white text-black p-0 overflow-hidden'>
				<DialogHeader className='pt-8 px-6'>
					<DialogTitle className='text-2xl text-center font-bold'>Customize your server</DialogTitle>
					<DialogDescription className='text-center text-zinc-500'>Give your server a personality with a name and an image. You can always change it later</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='space-y-8'
					>
						<div className='space-y-8 px-6'>
							<div className='flex items-center justify-center text-center'>
								<FormField
									control={form.control}
									name='imageUrl'
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<FileUpload
													endpoint='serverImage'
													value={field.value}
													onChange={field.onChange}
												/>
											</FormControl>
										</FormItem>
									)}
								/>
							</div>

							<FormField
								name='name'
								control={form.control}
								render={({ field }) => (
									<FormItem>
										<FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70'>Server Name</FormLabel>
										<FormControl>
											<Input
												disabled={isLoading}
												className='bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0'
												placeholder='Enter server name'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<DialogFooter className='bg-gray-100 px-6 py-4'>
							<Button
								variant='primary'
								disabled={isLoading}
							>
								Save
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default EditServerModal;
