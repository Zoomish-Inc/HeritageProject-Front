export function splitProseParagraphs(text: string): string[] {
	return text
		.replace(/\r\n/g, '\n')
		.replace(/\u00a0/g, ' ')
		.trim()
		.split(/\n\s*\n/)
		.map((paragraph) =>
			paragraph.replace(/[ \t]*\n[ \t]*/g, ' ').replace(/[ \t]{2,}/g, ' ').trim()
		)
		.filter((paragraph) => paragraph.length > 0);
}
