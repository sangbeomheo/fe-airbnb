import React, { useReducer, createContext, useMemo, SetStateAction } from 'react';
import PeriodModal from '@components/Modal/PeriodModal';
import PriceModal from '@components/Modal/PriceModal';

interface UseSelectedModal {
  selectedModal: React.ReactNode;
  setSelectedModal: SetStateAction<object>;
}

const SelectedModalContext = createContext<UseSelectedModal>({
  selectedModal: null,
  setSelectedModal: () => null
});

const modalReducer = (selectedModal: React.ReactNode, action: { type: string }) => {
  switch (action.type) {
    case 'checkin':
      return <PeriodModal />;
    case 'checkout':
      return <PeriodModal />;
    case 'price':
      return <PriceModal />;
    default:
      return new Error("'type'이 없습니다.");
  }
};

function SelectedModalProvider({ children }: { children: React.ReactNode }) {
  const [selectedModal, dispatchSelectedModal] = useReducer(modalReducer, null);
  const selectedModalState = useMemo(
    () => ({ selectedModal, dispatchSelectedModal }),
    [selectedModal]
  );

  return (
    <SelectedModalContext.Provider value={selectedModalState}>
      {children}
    </SelectedModalContext.Provider>
  );
}

export { SelectedModalContext, SelectedModalProvider };
