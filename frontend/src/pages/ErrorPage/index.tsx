import { useQueryClient } from '@tanstack/react-query';
import ApiError from '@api/ApiError';
import Button from '@components/_common/atoms/Button';
import { ButtonColor } from '@components/_common/atoms/Button/style';
import { isRouteErrorResponse, useNavigate, useRouteError } from 'react-router-dom';
import { routes } from '@router/path';
import useClubId from '@hooks/service/useClubId';
import S from './style';

interface ButtonConfig {
  label: string;
  to: string | number;
  color: ButtonColor;
}

interface ErrorMessageConfig {
  title: string;
  description: string;
  buttons?: ButtonConfig[];
}

const ErrorMessages: Record<number | string, ErrorMessageConfig> = {
  401: {
    title: '로그인이 필요한 페이지입니다.',
    description:
      '이 페이지를 보려면 로그인이 필요합니다.\n로그인 페이지로 이동하시려면 로그인 버튼을 클릭하세요. 계정이 없으신 경우 회원가입 버튼을 클릭하세요.',
    buttons: [
      {
        label: '로그인',
        to: routes.signIn(),
        color: 'primary',
      },
      {
        label: '회원가입',
        to: routes.signUp(),
        color: 'white',
      },
    ],
  },
  403: {
    title: '접근이 제한되었습니다.',
    description:
      '이 페이지에 접근할 수 있는 권한이 없습니다. 올바른 권한이 있는지 확인해 주세요.\n혹시 문제가 계속된다면, cruru.dev@gmail.com으로 문의해 주세요.',
    buttons: [
      {
        label: '이전 페이지로 돌아가기',
        to: -1,
        color: 'white',
      },
    ],
  },
  404: {
    title: '페이지를 찾을 수 없습니다.',
    description: '찾고 계신 페이지가 존재하지 않거나 이동되었습니다.\n주소를 다시 확인해 보세요.',
    buttons: [
      {
        label: '이전 페이지로 돌아가기',
        to: -1,
        color: 'white',
      },
    ],
  },
  500: {
    title: '서버에 문제가 발생했습니다.',
    description:
      '요청하신 작업을 처리하는 도중 문제가 발생했습니다. 불편을 드려 죄송합니다.\n잠시 후 다시 시도해 주세요. 문제가 계속된다면 cruru.dev@gmail.com으로 문의해 주세요.',
    buttons: [
      {
        label: '이전 페이지로 돌아가기',
        to: -1,
        color: 'white',
      },
    ],
  },
  default: {
    title: '알 수 없는 오류가 발생했습니다.',
    description:
      '요청하신 작업을 처리하는 도중 문제가 발생했습니다. 불편을 드려 죄송합니다.\n잠시 후 다시 시도해 주세요. 문제가 계속된다면 cruru.dev@gmail.com으로 문의해 주세요.',
    buttons: [
      {
        label: '이전 페이지로 돌아가기',
        to: -1,
        color: 'white',
      },
    ],
  },
};

function renderButtons(buttons: ButtonConfig[], navigate: ReturnType<typeof useNavigate>) {
  return (
    <S.ButtonContainer>
      {buttons.map(({ label, to, color }) => (
        <Button
          key={label}
          color={color}
          size="md"
          onClick={() => (typeof to === 'number' ? navigate(-1) : navigate(to))}
        >
          {label}
        </Button>
      ))}
    </S.ButtonContainer>
  );
}

export default function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();
  const { clearClubId } = useClubId();
  const queryClient = useQueryClient();

  let status;

  if (isRouteErrorResponse(error)) {
    status = error.status;
  } else if (error instanceof ApiError) {
    status = error.statusCode;
    if (status === 401) {
      queryClient.clear();
      clearClubId();
    }
  }

  const { title, description, buttons } = ErrorMessages[status ?? 'default'] || ErrorMessages.default;

  return (
    <S.Wrapper>
      <S.StatusCode>{Number(status) ? status : '???'}</S.StatusCode>
      <S.Title>{title}</S.Title>
      <S.Description>{description}</S.Description>
      {buttons && renderButtons(buttons, navigate)}
    </S.Wrapper>
  );
}
