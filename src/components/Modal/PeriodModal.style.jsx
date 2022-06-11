import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 64px;
`;
const ButtonWrap = styled.div`
  position: absolute;
  width: 100%;
  max-width: 736px;
  display: flex;
  justify-content: space-between;
  button {
    height: 24px;
    svg {
      padding: 0;
    }
  }
`;

export { Container, ButtonWrap };
