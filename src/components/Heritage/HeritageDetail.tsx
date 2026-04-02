'use client';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import type { HeritageObject, Locale } from '@/types/heritage';
import { OrnamentalDivider } from '@/components/UI/OrnamentalDivider';

interface Props {
	object: HeritageObject;
}

const Section = ({
	title,
	children,
}: {
	title: string;
	children: React.ReactNode;
}) => (
	<section className="mb-16">
		<div className="flex items-center gap-4 mb-6">
			<div className="w-1 h-6 bg-gold-400" />
			<h2 className="font-ui text-gold-400 text-xs tracking-[0.3em] uppercase">
				{title}
			</h2>
		</div>
		{children}
	</section>
);

const InfoRow = ({ label, value }: { label: string; value: string }) => (
	<div className="grid grid-cols-2 gap-4 py-3 border-b border-gold-400/10 last:border-0">
		<span className="text-gold-400/60 font-ui text-xs tracking-wider uppercase min-w-36 flex-shrink-0">
			{label}
		</span>
		<span className="text-parchment-100 font-ui text-sm leading-relaxed">
			{value}
		</span>
	</div>
);

export const HeritageDetail = ({ object }: Props) => {
	const locale = useLocale() as Locale;
	const t = useTranslations('heritage');
	const loc = locale;

	return (
		<article className="max-w-4xl mx-auto px-6 py-8">
			<Link
				href="/"
				className="inline-flex items-center gap-2 text-gold-400/60 hover:text-gold-400 transition-colors font-ui text-xs tracking-widest uppercase mb-10 group"
			>
				<span className="group-hover:-translate-x-1 transition-transform duration-200">
					←
				</span>
				<span>{t('back')}</span>
			</Link>

			<div className="relative mb-12 overflow-hidden">
				<div className="h-px bg-gradient-to-r from-gold-400 via-gold-400/40 to-transparent mb-6" />
				<div className="flex items-start justify-between gap-4 mb-4">
					<div>
						<p className="text-gold-400/60 font-ui text-xs tracking-[0.3em] uppercase mb-2">
							{object.yearRange ?? object.yearBuilt}
						</p>
						<h1 className="font-display text-parchment-50 text-3xl md:text-4xl leading-tight">
							{object.name[loc]}
						</h1>
						{object.formerName && (
							<p className="text-parchment-200/50 font-body italic text-sm mt-2">
								{object.formerName[loc]}
							</p>
						)}
					</div>
				</div>

				<div className="relative w-full h-72 md:h-96 mb-6 border border-gold-400/20 overflow-hidden">
					<Image
						src={object.coverImageUrl}
						alt={object.name[loc]}
						fill
						priority
						sizes="(max-width: 896px) 100vw, 896px"
						className="object-cover [filter:sepia(0.3)]"
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-sepia-900/60 to-transparent pointer-events-none" />
					<div className="absolute bottom-4 left-4 right-4 z-10">
						<p className="text-parchment-100/80 font-body italic text-sm leading-relaxed">
							{object.shortDescription[loc]}
						</p>
					</div>
				</div>
				<div className="h-px bg-gradient-to-r from-gold-400 via-gold-400/40 to-transparent" />
			</div>

			<Section title={t('current_purpose')}>
				<div className="bg-sepia-800/50 border border-gold-400/15 p-6">
					<InfoRow label={t('current_purpose')} value={object.currentPurpose[loc]} />
					<InfoRow
						label={t('historical_purpose')}
						value={object.historicalPurpose[loc]}
					/>
					<InfoRow label={t('address')} value={object.address[loc]} />
					<InfoRow
						label={t('year_built')}
						value={object.yearRange ?? String(object.yearBuilt)}
					/>
					<InfoRow label={t('style')} value={object.architecturalStyle[loc]} />
					{object.architect && (
						<InfoRow label={t('architect')} value={object.architect[loc]} />
					)}
				</div>
			</Section>

			<OrnamentalDivider />

			<Section title={t('architecture')}>
				<div className="relative pl-6 border-l border-gold-400/20">
					<p className="text-parchment-100 font-body text-base leading-loose">
						{object.architecturalDescription[loc]}
					</p>
				</div>

				{object.architectureDetails.length > 0 && (
					<div className="mt-8 space-y-6">
						<p className="text-gold-400/60 font-ui text-xs tracking-[0.3em] uppercase mb-4">
							{t('architecture_details')}
						</p>
						{object.architectureDetails.map((detail) => (
							<div
								key={`${object.slug}-arch-${detail.title.ru}`}
								className="border border-gold-400/15 bg-sepia-800/30 p-5"
							>
								<h4 className="font-display text-gold-300 text-lg mb-2">
									{detail.title[loc]}
								</h4>
								<p className="text-parchment-200/80 font-body text-sm leading-relaxed">
									{detail.description[loc]}
								</p>
							</div>
						))}
					</div>
				)}
			</Section>

			<OrnamentalDivider />

			<Section title={t('history')}>
				<div className="relative">
					<blockquote className="text-parchment-100 font-body text-base leading-loose pl-6 border-l-2 border-gold-400/40">
						{object.history[loc]}
					</blockquote>
				</div>
			</Section>

			<OrnamentalDivider label={t('audio_guide')} />
			<Section title={t('audio_guide')}>
				<div className="bg-sepia-800/50 border border-gold-400/20 p-6 space-y-4">
					<div className="flex items-center gap-3 mb-4">
						<div className="w-8 h-8 border border-gold-400/40 flex items-center justify-center">
							<span className="text-gold-400 text-sm">♪</span>
						</div>
						<p className="text-gold-400/70 font-ui text-xs tracking-wider uppercase">
							{object.audioGuide.narratorLabel[loc]}
						</p>
					</div>

					<div className="space-y-1">
						<p className="text-gold-400/50 font-ui text-xs tracking-widest uppercase">
							{t('listen')}
						</p>
						<p className="text-parchment-100/80 font-body italic text-sm leading-relaxed border-l border-gold-400/30 pl-4">
							«{object.audioGuide.transcript[loc]}»
						</p>
					</div>

					<div className="pt-4 border-t border-gold-400/10 grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<p className="text-gold-400/50 font-ui text-xs tracking-widest uppercase mb-1">
								{t('atmosphere')}
							</p>
							<p className="text-parchment-200/60 font-body text-xs italic">
								{object.audioGuide.atmosphereDescription[loc]}
							</p>
						</div>
						<div>
							<p className="text-gold-400/50 font-ui text-xs tracking-widest uppercase mb-1">
								{t('music_suggestion')}
							</p>
							<p className="text-parchment-200/60 font-body text-xs italic">
								{object.audioGuide.musicSuggestion[loc]}
							</p>
						</div>
					</div>
				</div>
			</Section>

			{object.historicalFigures.length > 0 && (
				<>
					<OrnamentalDivider label={t('figures')} />
					<Section title={t('figures')}>
						{object.historicalFigures.map((figure) => (
							<div
								key={`${object.slug}-figure-${figure.name.ru}`}
								className="border border-gold-400/20 bg-sepia-800/30 p-6 mb-4"
							>
								<h4 className="font-display text-parchment-100 text-xl mb-1">
									{figure.name[loc]}
								</h4>
								<p className="text-gold-400/70 font-ui text-xs tracking-wider uppercase mb-4">
									{figure.role[loc]}
								</p>
								<p className="text-parchment-200/80 font-body text-sm leading-relaxed mb-4">
									{figure.bio[loc]}
								</p>
								{figure.milestones && figure.milestones.length > 0 && (
									<div className="border-t border-gold-400/10 pt-4 space-y-2">
										{figure.milestones.map((m) => (
											<div
												key={`${object.slug}-fig-${figure.name.ru}-y${m.year}`}
												className="flex gap-4"
											>
												<span className="text-gold-400 font-ui text-xs w-12 flex-shrink-0">
													{m.year}
												</span>
												<span className="text-parchment-200/70 font-body text-xs">
													{m.event[loc]}
												</span>
											</div>
										))}
									</div>
								)}
							</div>
						))}
					</Section>
				</>
			)}

			{object.visualStyleNotes && (
				<>
					<OrnamentalDivider />
					<Section title={t('visual_style')}>
						<p className="text-parchment-200/60 font-body italic text-sm">
							{object.visualStyleNotes[loc]}
						</p>
					</Section>
				</>
			)}

			<div className="mt-16 flex items-center gap-4">
				<div className="flex-1 h-px bg-gradient-to-r from-transparent to-gold-400/40" />
				<span className="text-gold-400 text-xl">✦</span>
				<div className="flex-1 h-px bg-gradient-to-l from-transparent to-gold-400/40" />
			</div>
		</article>
	);
};
