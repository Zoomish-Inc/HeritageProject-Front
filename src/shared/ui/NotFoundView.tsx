import type { ComponentType, ReactNode } from 'react';
import type { UrlObject } from 'url';
import { ErrorOrNotFoundShell } from './ErrorOrNotFoundShell';
import { NavigatorBackButton } from './NavigatorBackButton';
import { OrnamentalDivider } from './OrnamentalDivider';
import { getUiCtaButtonClassName } from './UiCtaButton';

type LinkLikeProps = {
	href: string | UrlObject;
	className?: string;
	children?: ReactNode;
};

type NotFoundViewProps = {
	title: string;
	description: string;
	goBackLabel: string;
	backHomeLabel: string;
	LinkComponent: ComponentType<LinkLikeProps>;
};

export function NotFoundView({
	title,
	description,
	goBackLabel,
	backHomeLabel,
	LinkComponent,
}: NotFoundViewProps) {
	return (
		<ErrorOrNotFoundShell>
			<h1 className="font-display text-theme-primary text-2xl md:text-3xl mb-4">
				{title}
			</h1>
			<p className="text-theme-muted font-body text-sm mb-10 max-w-md mx-auto">
				{description}
			</p>
			<OrnamentalDivider />
			<div className="flex flex-wrap gap-4 justify-center mt-10">
				<NavigatorBackButton label={goBackLabel} />
				<LinkComponent
					href="/"
					className={getUiCtaButtonClassName({
						size: 'md',
						variant: 'accent',
						className: 'px-8 py-3',
					})}
				>
					{backHomeLabel}
				</LinkComponent>
			</div>
		</ErrorOrNotFoundShell>
	);
}
