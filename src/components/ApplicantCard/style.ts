import styled from '@emotion/styled';

const CardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 30rem;
  padding: 1rem 1.6rem;
  border-radius: 0.8rem;
  box-shadow: 0 0.4rem 0.8rem rgba(0, 0, 0, 0.1);
  background-color: ${({ theme }) => theme.baseColors.grayscale[50]};
`;

const CardDetail = styled.div`
  display: flex;
  flex-direction: column;
`;

const CardHeader = styled.h3`
  ${({ theme }) => theme.typography.heading[400]};
  color: ${({ theme }) => theme.baseColors.grayscale[900]};
  margin-bottom: 0.4rem;
`;

const CardDate = styled.span`
  ${({ theme }) => theme.typography.heading[300]};
  color: ${({ theme }) => theme.baseColors.grayscale[800]};
`;

const OptionButtonWrapper = styled.div`
  position: relative;
`;

const S = {
  CardContainer,
  CardDetail,
  CardHeader,
  CardDate,
  OptionButtonWrapper,
};

export default S;
