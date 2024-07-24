import { createContext, useContext, useState, ReactNode, useMemo, useCallback } from 'react';

interface SpecificApplicantIdContext {
  setApplicantId: (Id: number) => void;
  getApplicantId: () => number | undefined;
}

const SpecificApplicantIdContext = createContext<SpecificApplicantIdContext | undefined>(undefined);

export function SpecificApplicantIdProvider({ children }: { children: ReactNode }) {
  const [applicantId, setApplicantId] = useState<number | undefined>(undefined);

  const getApplicantId = useCallback(() => applicantId, [applicantId]);

  const obj = useMemo(() => ({ setApplicantId: (id: number) => setApplicantId(id), getApplicantId }), [getApplicantId]);

  return <SpecificApplicantIdContext.Provider value={obj}>{children}</SpecificApplicantIdContext.Provider>;
}

export const useSpecificApplicantId = (): SpecificApplicantIdContext => {
  const context = useContext(SpecificApplicantIdContext);
  if (!context) {
    throw new Error('useSpecificApplicantId 훅은 SpecificApplicantIdProvider 내부에서 사용되어야 합니다.');
  }
  return context;
};
