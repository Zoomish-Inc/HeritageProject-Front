const shimmerSvg = `
<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 800' preserveAspectRatio='none'>
  <defs>
    <linearGradient id='g'>
      <stop stop-color='#2f251d' offset='20%' />
      <stop stop-color='#4a3c2f' offset='50%' />
      <stop stop-color='#2f251d' offset='70%' />
    </linearGradient>
  </defs>
  <rect width='1200' height='800' fill='url(#g)' />
</svg>`;

export const imagePlaceholderDataUrl = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
	shimmerSvg
)}`;

export const imageQuality = 78;
