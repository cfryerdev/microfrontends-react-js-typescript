import React from 'react';
import { useNavigate } from "react-router-dom";
import Account from "../types/account";

interface AccountContextState {
  getAccountDetails: Function;
  isLoggedIn: Function;
  login: Function;
  logout: Function;
}

interface AccountContextProps {
  children: React.ReactNode;
}

const DefaultState: Account = {
  username: undefined,
  email: undefined,
  isAuthenticated: false
};

const AccountContext = React.createContext({
  getAccountDetails: (): Account => { return DefaultState },
  isLoggedIn: (): boolean => { return false },
  login: (username: string, email: any): void => { },
  logout: (): void => { }
} as AccountContextState);

const AccountProvider = ({ children }: AccountContextProps) => {
  const navigate = useNavigate();
  const AccountKey = "app_account_session";

  const _setAccountSession = (account: Account): void => {
    localStorage.setItem(AccountKey, JSON.stringify(account))
  };
  const _getAccountSession = (): any => {
    const item = localStorage.getItem(AccountKey);
    return item !== null ? JSON.parse(item) : DefaultState
  };
  const _clearAccountSession = (): void => {
    localStorage.removeItem(AccountKey);
  };
  const getAccountDetails = (): Account => {
    return _getAccountSession() as Account;
  };
  const isLoggedIn = (): boolean => {
    return _getAccountSession().isAuthenticated;
  };
  const login = (username: string, email: any): void => {
    _setAccountSession({ username, email, isAuthenticated: true } as Account);
    navigate("/");
  };
  const logout = (): void => {
    _clearAccountSession();
    navigate("/");
  };
  return (
    <AccountContext.Provider value={{ 
      getAccountDetails,
      isLoggedIn,
      login,
      logout
    }}>
      {children}
    </AccountContext.Provider>
  );
};

const AccountConsumer = AccountContext.Consumer;

export { 
  AccountProvider, 
  AccountContext, 
  AccountConsumer,
  AccountContextState
};
