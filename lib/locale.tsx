import { createContext, useContext, ReactNode, FC } from 'react';

interface LocaleProviderProps {
  value: string | undefined;
  children: ReactNode;
}

const LocaleContext = createContext < string | undefined > (undefined);

export const LocaleProvider: FC<LocaleProviderProps> = ({ value, children }) => {
  return (
    <LocaleContext.Provider value={value}>
      {children}
    </LocaleContext.Provider>
  );
}

export const useLocale = (): string | undefined => useContext(LocaleContext);