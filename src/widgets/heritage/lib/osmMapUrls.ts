import type { HeritageCoordinates } from '@/entities/heritage';

const DEFAULT_BBOX_DELTA = 0.006;

export const buildOsmEmbedUrl = (
	coordinates: HeritageCoordinates,
	delta = DEFAULT_BBOX_DELTA
) => {
	const { lat, lng } = coordinates;
	const minLon = lng - delta;
	const minLat = lat - delta;
	const maxLon = lng + delta;
	const maxLat = lat + delta;
	const bbox = `${minLon},${minLat},${maxLon},${maxLat}`;
	return `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(bbox)}&layer=mapnik&marker=${lat}%2C${lng}`;
};

export const buildOsmViewUrl = (coordinates: HeritageCoordinates) =>
	`https://www.openstreetmap.org/?mlat=${coordinates.lat}&mlon=${coordinates.lng}#map=17/${coordinates.lat}/${coordinates.lng}`;
