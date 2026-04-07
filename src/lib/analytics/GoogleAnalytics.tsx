import { analyticsConfig } from '@/shared/config';

export function GoogleAnalytics() {
	const gaId = analyticsConfig.gaId;
	if (!gaId) return null;

	return (
		<>
			<script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
			<script
				dangerouslySetInnerHTML={{
					__html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaId}', { send_page_view: false });`,
				}}
			/>
		</>
	);
}
