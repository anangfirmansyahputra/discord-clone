import { UserButton } from '@clerk/nextjs/app-beta';

export default function Page() {
	return (
		<div>
			<UserButton afterSignOutUrl='/' />
		</div>
	);
}
