import React, { useState, useContext, useEffect } from 'react';
import { Container, SearchButtonWrap, SearchText } from '@components/SearchBar/index.style';
import { ReservationInfoContext } from '@contexts/ReservationInfoProvider';
import { SelectedModalNameContext } from '@/contexts/SelectedModalNameProvider';
import PeriodModal from '@components/Modal/PeriodModal';
import PriceModal from '@components/Modal/PriceModal';
import IconButton from '@components/common/IconButton';
import SearchInputButton from '@components/SearchBar/SearchInputButton';
import { PERSONS_TEXTS } from '@/constants';

const searchInputButtonsInfo = [
  {
    name: '체크인',
    label: '체크인',
    placeholder: '날짜 입력',
    searchName: 'checkin',
    hasCloseBtn: false,
    hasBorderLeft: false
  },
  {
    name: '체크아웃',
    label: '체크아웃',
    placeholder: '날짜 입력',
    searchName: 'checkout',
    hasBorderLeft: false
  },
  { name: '요금', label: '요금', placeholder: '금액대 설정', searchName: 'price' },
  { name: '인원', label: '인원', placeholder: '게스트 추가', searchName: 'persons' }
];

function SearchBar() {
  const { reservationInfo } = useContext(ReservationInfoContext);
  const { selectedModalName } = useContext(SelectedModalNameContext);
  const [selectedModal, setSelectedModal] = useState<React.ReactNode | null>(null);

  const getSelectedModal = () => {
    switch (selectedModalName) {
      case 'checkin':
        setSelectedModal(<PeriodModal />);
        break;
      case 'checkout':
        setSelectedModal(<PeriodModal />);
        break;
      case 'price':
        setSelectedModal(<PriceModal />);
        break;
      default:
        setSelectedModal(null);
    }
  };

  useEffect(getSelectedModal, [selectedModalName]);

  const getReservationPersonnelText = () => {
    const reservationPersonnelTexts = Object.keys(reservationInfo.persons).reduce(
      (text, ageGroup, idx) => {
        const numberForAgeGroup =
          reservationInfo.persons[ageGroup as keyof typeof reservationInfo.persons];

        return (
          text + (numberForAgeGroup > 0 ? `${PERSONS_TEXTS[idx]} ${numberForAgeGroup}명, ` : '')
        );
      },
      ''
    );

    return reservationPersonnelTexts;
  };

  const hasReservationDate = reservationInfo.period.checkin && reservationInfo.period.checkout;

  return (
    <>
      <Container className="searchBar">
        {searchInputButtonsInfo.map(
          ({ name, label, placeholder, searchName, hasCloseBtn, hasBorderLeft }, idx) => (
            <SearchInputButton
              key={idx}
              name={name}
              label={label}
              placeholder={placeholder}
              searchName={searchName}
              hasCloseBtn={hasCloseBtn}
              hasBorderLeft={hasBorderLeft}
            />
          )
        )}
        <SearchButtonWrap disabled={!hasReservationDate}>
          <IconButton icon="search" disabled={!hasReservationDate}>
            {hasReservationDate ? <SearchText>검색</SearchText> : undefined}
          </IconButton>
        </SearchButtonWrap>
      </Container>
      {selectedModal}
    </>
  );
}

export default SearchBar;
