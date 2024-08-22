import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { RecruitmentInfoState } from '@customTypes/dashboard';
import { applyQueries } from '@hooks/apply';
import applyApis from '@api/domain/apply/apply';
import QUERY_KEYS from '@hooks/queryKeys';
import { RecruitmentPost } from '@customTypes/apply';

interface usePostManagementProps {
  postId: string;
}

const INITIAL_POST_INFO: RecruitmentInfoState = {
  title: '',
  startDate: '',
  endDate: '',
  postingContent: '',
};

export default function usePostManagement({ postId }: usePostManagementProps) {
  const { data: postInfo, isLoading } = applyQueries.useGetRecruitmentPost({ postId });
  const [postState, setPostState] = useState<RecruitmentInfoState>(INITIAL_POST_INFO);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!isLoading && postInfo && Object.keys(postInfo).length > 0) {
      setPostState(postInfo);
    }
  }, [isLoading, postInfo]);

  const modifyPostMutator = useMutation({
    mutationFn: () => applyApis.modify({ postId, body: postState as RecruitmentPost }),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.RECRUITMENT_INFO, postId] });
      alert('지원서의 사전 질문 항목 수정에 성공했습니다.');
    },
    onError: () => {
      alert('지원서의 사전 질문 항목 수정에 실패했습니다.');
    },
  });

  return {
    isLoading,
    postState,
    setPostState,
    modifyPostMutator,
  };
}
