import React, { useReducer, createContext, useMemo, Dispatch } from 'react';
import PeriodModal from '@components/Modal/PeriodModal';
import PriceModal from '@components/Modal/PriceModal';

interface UseSelectedModal {
  selectedModal: React.ReactNode | null;
  dispatchSelectedModal: Dispatch<{ type: string }>;
}

const SelectedModalContext = createContext<UseSelectedModal>({
  selectedModal: null,
  dispatchSelectedModal: () => null
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
      console.error("'type'이 없습니다.");
      return selectedModal;
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
