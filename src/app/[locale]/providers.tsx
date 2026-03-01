'use client';
import { LocaleContext, translations } from '@/i18n';
import type { Locale } from '@/types/heritage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

export const Providers = ({
  children,
  initialLocale,
}: {
  children: React.ReactNode;
  initialLocale: Locale;
}) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5,
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      })
  );
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    window.history.replaceState(
      {},
      '',
      window.location.pathname.replace(/^\/(ru|uz)/, `/${l}`)
    );
  };

  return (
    <QueryClientProvider client={queryClient}>
      <LocaleContext.Provider
        value={{ locale, t: translations[locale], setLocale }}
      >
        {children}
      </LocaleContext.Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
