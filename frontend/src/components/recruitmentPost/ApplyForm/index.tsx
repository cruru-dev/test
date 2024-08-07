import React, { useState } from 'react';
import Button from '@components/common/Button';
import InputField from '@components/common/InputField';

import { KeyedStrings } from '@customTypes/utilTypes';
import ValidationError from '@utils/errors/ValidationError';
import { formatPhoneNumber } from '@utils/formatPhoneNumber';
import { isValidEmail, isValidPhoneNumber } from '@domain/validations/apply';

import S from './style';
import C from '../style';

interface Applicant {
  name: string;
  email: string;
  phone: string;
}

export default function ApplyForm() {
  const [applicant, setApplicant] = useState<Applicant>({ name: '', email: '', phone: '' });
  const [applicantError, setApplicantError] = useState<KeyedStrings<Applicant>>({} as KeyedStrings<Applicant>);

  const handleApplicantChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setApplicant((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setApplicantError({} as KeyedStrings<Applicant>);

    try {
      if (!isValidEmail(applicant.email)) {
        throw new ValidationError({ inputName: 'email', message: '이메일을 확인해 주세요.' });
      }

      if (!isValidPhoneNumber(applicant.phone)) {
        throw new ValidationError({ inputName: 'phone', message: '전화번호를 확인해 주세요.' });
      }
    } catch (err) {
      if (err instanceof ValidationError) {
        setApplicantError((prev) => ({ ...prev, [err.inputName]: err.message }));
      }
    }
  };

  return (
    <C.ContentContainer>
      <S.Form onSubmit={handleSubmit}>
        <InputField
          value={applicant?.name}
          error={applicantError?.name}
          onChange={handleApplicantChange}
          name="name"
          label="이름"
          placeholder="이름을 입력해 주세요."
          required
        />
        <InputField
          value={applicant?.email}
          error={applicantError?.email}
          onChange={handleApplicantChange}
          name="email"
          label="이메일"
          placeholder="안내받을 이메일 주소를 입력해 주세요."
          required
        />
        <InputField
          value={formatPhoneNumber(applicant?.phone)}
          error={applicantError?.phone}
          onChange={handleApplicantChange}
          name="phone"
          label="전화 번호"
          placeholder="번호만 입력해 주세요."
          maxLength={13}
          required
        />

        <C.ButtonContainer>
          <Button
            type="submit"
            color="primary"
            size="fillContainer"
          >
            지원하기
          </Button>
        </C.ButtonContainer>
      </S.Form>
    </C.ContentContainer>
  );
}
