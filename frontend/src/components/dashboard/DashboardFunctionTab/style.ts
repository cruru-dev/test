import styled from '@emotion/styled';
import { css } from '@emotion/react';
import SearchIcon from '@assets/images/search.svg';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  height: 3.4rem;
`;

const FunctionsContainer = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1.2rem;

  width: fit-content;
`;

const SearchInputContainer = styled.div<{ isValue: boolean }>`
  width: 20rem;

  & input {
    ${({ theme }) => theme.typography.common.block};
    padding: 0.6rem 1.6rem;
    margin-bottom: inherit;
    background-color: ${({ theme }) => theme.baseColors.grayscale[50]};
    color: ${({ theme }) => theme.baseColors.grayscale[900]};

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

    &::placeholder {
      font-weight: 400;
    }

    &:focus {
      border-color: ${({ theme }) => theme.baseColors.grayscale[600]};
    }
  }
`;

const DropdownContainer = styled.div`
  height: 3.4rem;

  & .dropdown-header {
    padding: 4px 4px 4px 8px;
    color: ${({ theme }) => theme.baseColors.grayscale[900]};
    background-color: ${({ theme }) => theme.baseColors.grayscale[50]};
  }
`;

const FilterWrapper = styled.div`
  position: relative;
`;

const FilterButton = styled.button<{ isFilterApplied: boolean }>`
  width: 6.4rem;
  height: 3.4rem;
  border-radius: 0.8rem;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;

  ${({ theme }) => theme.typography.heading[200]};

  ${({ isFilterApplied, theme }) => {
    if (isFilterApplied) {
      return css`
        background-color: ${theme.baseColors.purplescale[500]};
        border: 0.1rem solid ${theme.baseColors.purplescale[600]};
        color: ${theme.baseColors.grayscale[50]};
      `;
    }

    return css`
      background-color: ${theme.baseColors.grayscale[50]};
      border: 0.1rem solid ${theme.baseColors.grayscale[400]};
      color: ${theme.baseColors.grayscale[900]};
      &:focus {
        border-color: ${theme.baseColors.grayscale[600]};
      }
    `;
  }}
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
  DropdownContainer,

  FilterButton,
  FilterWrapper,
  FilterContainer,
};

export default S;
