import { HiOutlineClock, HiOutlineChat } from 'react-icons/hi';
import { HiEllipsisVertical } from 'react-icons/hi2';

import React, { useCallback, useEffect, useRef } from 'react';

import IconButton from '@components/_common/atoms/IconButton';
import PopOverMenu from '@components/_common/molecules/PopOverMenu';
import formatDate from '@utils/formatDate';

import { useDropdown } from '@contexts/DropdownContext';

import type { DropdownItemType } from '@components/_common/molecules/DropdownItemRenderer';
import DropdownItemRenderer from '@components/_common/molecules/DropdownItemRenderer';
import CheckBox from '@components/_common/atoms/CheckBox';
import S from './style';

interface ApplicantCardProps {
  name: string;
  isRejected: boolean;
  createdAt: string;
  evaluationCount: number;
  averageScore: number;
  popOverMenuItems: DropdownItemType[];
  isSelectMode: boolean;
  isSelected: boolean;
  onCardClick: () => void;
  onSelectApplicant: (isChecked: boolean) => void;
}

export default function ApplicantCard({
  name,
  isRejected,
  createdAt,
  evaluationCount,
  averageScore,
  popOverMenuItems,
  isSelectMode,
  isSelected,
  onCardClick,
  onSelectApplicant,
}: ApplicantCardProps) {
  const { isOpen, open, close } = useDropdown();
  const optionButtonWrapperRef = useRef<HTMLDivElement>(null);

  const evaluationString = evaluationCount > 0 ? averageScore.toFixed(1) : '―';

  const handleClickPopOverButton = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (isOpen) close();
    if (!isOpen) open();
  };

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (optionButtonWrapperRef.current && !optionButtonWrapperRef.current.contains(event.target as Node)) {
        close();
      }
    },
    [close],
  );

  const handleMouseLeave = () => {
    close();
  };

  const cardClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (isSelectMode) {
      onSelectApplicant(!isSelected);
      return;
    }
    onCardClick();
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, handleClickOutside]);

  return (
    <S.CardContainer
      onMouseLeave={handleMouseLeave}
      onClick={cardClickHandler}
    >
      <S.CardDetail>
        <S.CardHeader>{name}</S.CardHeader>
        <S.CardInfoContainer>
          <S.CardEvaluationFlag
            averageScore={averageScore}
            isScoreExists={evaluationCount > 0}
          >
            ★
            <S.CardEvaluationFlagScore isScoreExists={evaluationCount > 0}>
              {evaluationString}
            </S.CardEvaluationFlagScore>
          </S.CardEvaluationFlag>
          <S.CardInfo>
            <HiOutlineClock size="1.2rem" />
            {formatDate(createdAt)}
          </S.CardInfo>

          <S.CardInfo>
            <HiOutlineChat size="1.2rem" />
            {evaluationCount}
          </S.CardInfo>
        </S.CardInfoContainer>
      </S.CardDetail>

      <S.OptionButtonWrapper>
        <div ref={optionButtonWrapperRef}>
          {isSelectMode && (
            <CheckBox
              isChecked={isSelected}
              onToggle={() => {}}
            />
          )}
          {!isSelectMode && (
            <>
              <IconButton
                type="button"
                outline={false}
                onClick={handleClickPopOverButton}
                disabled={isRejected}
              >
                <HiEllipsisVertical />
              </IconButton>
              <PopOverMenu
                isOpen={isOpen}
                popOverPosition="3.5rem 0 0 -6rem"
              >
                <DropdownItemRenderer
                  items={popOverMenuItems}
                  subContentPlacement="left"
                />
              </PopOverMenu>
            </>
          )}
        </div>
      </S.OptionButtonWrapper>
    </S.CardContainer>
  );
}
