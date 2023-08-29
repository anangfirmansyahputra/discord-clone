import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip';

interface Props {
	label: string;
	children: React.ReactNode;
	side?: 'top' | 'right' | 'bottom' | 'left';
	align?: 'start' | 'center' | 'end';
}

const ActionTooltip: React.FC<Props> = ({ children, label, align, side }) => {
	return (
		<TooltipProvider>
			<Tooltip delayDuration={50}>
				<TooltipTrigger asChild>{children}</TooltipTrigger>
				<TooltipContent
					side={side}
					align={align}
				>
					<p className='font-semibold text-sm capitalize'>{label.toLowerCase()}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};

export default ActionTooltip;
