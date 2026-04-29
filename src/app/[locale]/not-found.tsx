import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { NotFoundView } from '@/shared/ui';

export default async function LocaleNotFound() {
	const t = await getTranslations('errors');

	return (
		<NotFoundView
			title={t('not_found_title')}
			description={t('not_found_description')}
			goBackLabel={t('go_back')}
			backHomeLabel={t('back_home')}
			LinkComponent={Link}
		/>
	);
}
