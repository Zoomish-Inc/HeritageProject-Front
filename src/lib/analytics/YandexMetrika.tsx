import { analyticsConfig } from '@/shared/config';

export function YandexMetrika() {
	const counterId = analyticsConfig.yandexMetrikaId;
	if (!counterId) return null;

	const id = Number(counterId);
	const initJson = JSON.stringify({
		defer: true,
		ssr: true,
		webvisor: true,
		clickmap: true,
		ecommerce: 'dataLayer',
		accurateTrackBounce: true,
		trackLinks: true,
	});

	return (
		<>
			<script
				dangerouslySetInnerHTML={{
					__html: `(function(m,e,t,r,i,k,a){
m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
m[i].l=1*new Date();
for (var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}
k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
})(window,document,'script','https://mc.yandex.ru/metrika/tag.js?id=${id}','ym');
ym(${id},'init',${initJson});`,
				}}
			/>
			<noscript>
				<div>
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img
						src={`https://mc.yandex.ru/watch/${id}`}
						style={{ position: 'absolute', left: -9999 }}
						alt=""
					/>
				</div>
			</noscript>
		</>
	);
}
