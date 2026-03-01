export const LoadingSpinner = ({ label }: { label?: string }) => (
  <div className="flex flex-col items-center justify-center py-24 gap-4">
    <div className="w-12 h-12 border border-gold-400/30 flex items-center justify-center relative">
      <div className="absolute inset-0 border-t border-gold-400 animate-spin" />
      <span className="text-gold-400 font-ui text-sm">Ф</span>
    </div>
    {label && <p className="text-gold-400/60 font-ui text-xs tracking-widest uppercase">{label}</p>}
  </div>
);
