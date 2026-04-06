export function JsonLdScript({ payload }: { payload: unknown }) {
	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
		/>
	);
}
