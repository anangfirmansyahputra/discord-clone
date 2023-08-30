'use client';

import qs from 'query-string';
import { useModal } from '@/hooks/use-modal-store';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { ChannelType } from '@prisma/client';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useEffect } from 'react';

const formSchema = z.object({
	name: z
		.string()
		.min(1, {
			message: 'Channel name is required',
		})
		.refine((name) => name !== 'general', {
			message: "Channel name cannot be 'general'",
		}),
	type: z.nativeEnum(ChannelType),
});

const CreateChannelModal = () => {
	const { isOpen, onClose, onOpen, type, data } = useModal();
	const router = useRouter();
	const params = useParams();

	const isModalOpen = isOpen && type === 'createChannel';
	const { channelType } = data;

	const form = useForm({
		defaultValues: {
			name: '',
			type: channelType || ChannelType.TEXT,
		},
		resolver: zodResolver(formSchema),
	});

	const isLoading = form.formState.isSubmitting;

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			const url = qs.stringifyUrl({
				url: '/api/channels',
				query: {
					serverId: params?.serverId,
				},
			});
			const res = await axios.post(url, values);

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
		if (channelType) {
			form.setValue('type', channelType);
		} else {
			form.setValue('type', ChannelType.TEXT);
		}
	}, [channelType, form]);

	return (
		<Dialog
			open={isModalOpen}
			onOpenChange={handleClose}
		>
			<DialogContent className='bg-white text-black p-0 overflow-hidden'>
				<DialogHeader className='pt-8 px-6'>
					<DialogTitle className='text-2xl text-center font-bold'>Create Channel</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='space-y-8'
					>
						<div className='space-y-8 px-6'>
							<FormField
								name='name'
								control={form.control}
								render={({ field }) => (
									<FormItem>
										<FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70'>Channel Name</FormLabel>
										<FormControl>
											<Input
												disabled={isLoading}
												className='bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0'
												placeholder='Enter channel name'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='type'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Channel Type</FormLabel>
										<Select
											disabled={isLoading}
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger className='bg-zinc-300/50 border-0 focus:ring-0 text-base ring-offset-0 focus:ring-offset-0 capitalize outline-none'>
													<SelectValue placeholder='Select a channel type' />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{Object.values(ChannelType).map((type) => (
													<SelectItem
														key={type}
														value={type}
														className='capitalize'
													>
														{type.toLowerCase()}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
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
								Create
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default CreateChannelModal;
