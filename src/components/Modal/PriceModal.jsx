import React from 'react';
import { Description } from '@/components/Modal/index.style';
import Modal from '@components/Modal';
import { Title, PriceGraph } from '@/components/Modal/PriceModal.style';

export default function PriceModal() {
  return (
    <Modal>
      <Title>가격 범위</Title>
      <div>
        ₩<span>100,000</span> - ₩<span>1,000,000</span>+
      </div>
      <Description>
        평균 1박 요금은 <span>₩</span>입니다.
      </Description>
      <PriceGraph />
    </Modal>
  );
}
