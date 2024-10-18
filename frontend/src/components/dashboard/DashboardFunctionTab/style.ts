import styled from '@emotion/styled';
import { css } from '@emotion/react';
import SearchIcon from '@assets/images/search.svg';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  height: 4.8rem;
`;

const FunctionsContainer = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1.2rem;

  width: fit-content;
`;

const SearchInputContainer = styled.div<{ isValue: boolean }>`
  width: 18rem;

  & input {
    ${({ theme }) => theme.typography.common.block};
    padding: 0.8rem 1.6rem;
    margin-bottom: inherit;
    background-color: ${({ theme }) => theme.baseColors.grayscale[50]};

    ${({ isValue }) => {
      if (!isValue) {
        return css`
          background-image: url(${SearchIcon});
          background-repeat: no-repeat;
          background-size: 1.4rem;
          background-position: bottom 50% right 1.6rem;
        `;
      }
    }};
  }
`;

const FilterWrapper = styled.div`
  position: relative;
`;

const FilterButtonContent = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.4rem;
`;

const FilterContainer = styled.div`
  position: absolute;
  transform: translateY(0.8rem);

  background-color: ${({ theme }) => theme.baseColors.grayscale[50]};
  border: 1px solid ${({ theme }) => theme.baseColors.grayscale[400]};
  border-radius: 0.8rem;
  box-shadow: ${({ theme }) => `0 0.2rem 0.6rem ${theme.baseColors.grayscale[400]}`};
  padding: 0.2rem;
  z-index: 10;
`;

const S = {
  Wrapper,
  FunctionsContainer,

  SearchInputContainer,

  FilterButtonContent,
  FilterWrapper,
  FilterContainer,
};

export default S;
