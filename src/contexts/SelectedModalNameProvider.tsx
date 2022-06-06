import React, { useState, createContext, useMemo, SetStateAction } from 'react';

interface UseSelectedModalName {
  selectedModalName: string | null;
  setSelectedModalName: SetStateAction<object>;
}

const SelectedModalNameContext = createContext<UseSelectedModalName>({
  selectedModalName: null,
  setSelectedModalName: () => null
});

function SelectedModalNameProvider({ children }: { children: React.ReactNode }) {
  const [selectedModalName, setSelectedModalName] = useState(null);
  const useSelectedModalName = useMemo(
    () => ({ selectedModalName, setSelectedModalName }),
    [selectedModalName]
  );

  return (
    <SelectedModalNameContext.Provider value={useSelectedModalName}>
      {children}
    </SelectedModalNameContext.Provider>
  );
}

export { SelectedModalNameContext, SelectedModalNameProvider };
