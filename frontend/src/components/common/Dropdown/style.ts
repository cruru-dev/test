import styled from '@emotion/styled';

const Container = styled.div<{ size: 'sm' | 'md'; isOpen: boolean; width?: number; isShadow: boolean }>`
  width: ${({ size, width }) => (width ? `${width}px` : size === 'sm' ? '90px' : '240px')};
  position: relative;

  border-radius: ${({ isOpen }) => (isOpen ? '8px 8px 0px 0px' : '8px')};
  box-shadow: ${({ isShadow, theme }) => (isShadow ? `0px 4px 4px ${theme.colors.text.block}` : 'none')};
`;

const Header = styled.div<{ isOpen: boolean; size: 'sm' | 'md' }>`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: ${({ size }) => (size === 'md' ? '16px 24px' : '8px 12px')};

  border: 1px solid ${({ theme }) => theme.colors.text.block};

  border-radius: ${({ isOpen }) => (isOpen ? '8px 8px 0px 0px' : '8px')};
  border-bottom: ${({ isOpen, theme }) =>
    isOpen ? `1px solid ${theme.baseColors.grayscale[200]}` : `1px solid ${theme.colors.text.block}`};

  ${({ theme, size }) => (size === 'md' ? theme.typography.heading[500] : theme.typography.heading[200])}
  margin-bottom: 0;
  cursor: pointer;

  ${({ isOpen, theme, size }) =>
    isOpen &&
    ` ::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: ${size === 'md' ? '16px' : '8px'};
        right: ${size === 'md' ? '16px' : '8px'};
        height: 1px;
        background-color: ${theme.colors.text.block};
      }
    `}
`;

const List = styled.div<{ size: 'sm' | 'md'; isShadow: boolean }>`
  position: absolute;
  width: 100%;
  padding: ${({ size }) => (size === 'md' ? '16px' : '8px')};
  background-color: ${({ theme }) => theme.baseColors.grayscale[50]};

  border: 1px solid ${({ theme }) => theme.colors.text.block};
  border-radius: 0px 0px 8px 8px;
  border-top: none;

  box-sizing: border-box;
  box-shadow: ${({ isShadow, theme }) => (isShadow ? `0px 4px 4px ${theme.colors.text.block}` : 'none')};

  z-index: 1;
`;

const S = {
  Container,
  Header,
  List,
};

export default S;
