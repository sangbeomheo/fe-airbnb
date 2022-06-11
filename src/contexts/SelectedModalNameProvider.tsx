import React, { useState, createContext, useMemo, SetStateAction } from 'react';

type SelectedModalName = string | null;

interface UseSelectedModalName {
  selectedModalName: SelectedModalName;
  setSelectedModalName: SetStateAction<object>;
  showSearchModal: (searchName: string) => void;
  hideSearchModal: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

const SelectedModalNameContext = createContext<UseSelectedModalName>({
  selectedModalName: null,
  setSelectedModalName: () => null,
  showSearchModal: () => null,
  hideSearchModal: () => null
});

function SelectedModalNameProvider({ children }: { children: React.ReactNode }) {
  const [selectedModalName, setSelectedModalName] = useState<SelectedModalName>(null);

  const showSearchModal = (searchName: SelectedModalName) => {
    setSelectedModalName(searchName);
  };

  const checkToClickOnModal = (target: HTMLElement) =>
    target?.closest('.modal') || target?.classList.contains('modal');

  const checkToClickOnSearchInput = (target: HTMLElement) =>
    target?.closest('.searchBar') || target?.classList.contains('searchBar');

  const hideSearchModal = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const target = event.target as HTMLElement;
    if (selectedModalName && !checkToClickOnModal(target) && !checkToClickOnSearchInput(target))
      setSelectedModalName(null);
  };

  const useSelectedModalName = useMemo(
    () => ({ selectedModalName, setSelectedModalName, showSearchModal, hideSearchModal }),
    [selectedModalName]
  );

  return (
    <SelectedModalNameContext.Provider value={useSelectedModalName}>
      {children}
    </SelectedModalNameContext.Provider>
  );
}

export { SelectedModalNameContext, SelectedModalNameProvider };
