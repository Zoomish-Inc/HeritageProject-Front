'use client';

import { DecorativeFlourish } from '@/components/UI/DecorativeFlourish';

type Props = {
	children: React.ReactNode;
};

export const ErrorOrNotFoundShell = ({ children }: Props) => {
	return (
		<section className="relative overflow-hidden">
			<div className="absolute inset-0 opacity-5">
				<div
					className="absolute inset-0"
					style={{
						backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 30px,
              rgba(201,168,76,0.3) 30px,
              rgba(201,168,76,0.3) 31px
            )`,
					}}
				/>
			</div>

			<div className="relative max-w-3xl mx-auto px-6 py-20 md:py-28 text-center">
				<div className="mb-10">
					<DecorativeFlourish className="justify-center" />
				</div>
				{children}
			</div>
		</section>
	);
};
