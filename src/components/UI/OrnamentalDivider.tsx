export const OrnamentalDivider = ({ label }: { label?: string }) => (
  <div className="flex items-center gap-4 my-8">
    <div className="flex-1 h-px bg-gradient-to-r from-transparent to-gold-400/40" />
    {label ? (
      <span className="text-gold-400 font-ui text-xs tracking-[0.3em] uppercase px-4 border border-gold-400/30 py-1">
        {label}
      </span>
    ) : (
      <span className="text-gold-400 text-lg">✦</span>
    )}
    <div className="flex-1 h-px bg-gradient-to-l from-transparent to-gold-400/40" />
  </div>
);
