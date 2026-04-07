'use client';

import { useRouter } from 'next/navigation';

type Props = {
	label: string;
	className?: string;
};

export const NavigatorBackButton = ({ label, className }: Props) => {
	const router = useRouter();

	return (
		<button
			type="button"
			onClick={() => router.back()}
			className={
				className ??
				'theme-button-outline px-6 py-2 font-ui text-xs tracking-widest uppercase'
			}
		>
			{label}
		</button>
	);
};
