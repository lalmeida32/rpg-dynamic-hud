import React, { createContext, useCallback, useState } from 'react';
import { Alert } from 'shared/components/Alert';

interface ICurrentAlertContextData {
  alertChildren: React.ReactNode | null;
  setAlert: (alertChildren: React.ReactNode) => void;
  closeAlert: () => void;
}

interface ICurrentAlertProviderProps {
  children: React.ReactNode;
}

export const CurrentAlertContext = createContext<ICurrentAlertContextData>(
  {} as ICurrentAlertContextData
);

export const CurrentAlertProvider: React.FC<ICurrentAlertProviderProps> = ({
  children,
}) => {
  /* STATE */
  const [alertChildren, setAlertChildren] = useState<React.ReactNode | null>(
    null
  );

  /* LOGIC */
  const setAlert = useCallback((alertChildren: React.ReactNode) => {
    setAlertChildren(alertChildren);
  }, []);

  const closeAlert = useCallback(() => setAlertChildren(null), []);

  /* PROVIDER */
  return (
    <CurrentAlertContext.Provider
      value={{
        alertChildren,
        setAlert,
        closeAlert,
      }}
    >
      {children}
      {alertChildren ? <Alert>{alertChildren}</Alert> : null}
    </CurrentAlertContext.Provider>
  );
};
