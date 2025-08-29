import React, { createContext, useContext, ReactNode } from "react";

interface ConfigProviderProps {
  value: any;
  children: ReactNode;
}

const ConfigContext = createContext<any | undefined>(undefined);

export function ConfigProvider({
  value,
  children,
}: ConfigProviderProps): React.JSX.Element {
  return (
    <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>
  );
}

export function useConfig(): any | undefined {
  return useContext(ConfigContext);
}
