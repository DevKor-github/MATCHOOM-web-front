export interface SessionType {
  name: string;
  phone: string;
  bank: string;
  account: string;
  accountHolder: string;
}

const SESSION = 'session';

export const getSession = () => {
  const sessionData = localStorage.getItem(SESSION);
  return sessionData ? (JSON.parse(sessionData) as SessionType) : undefined;
};

export const setSession = (session: SessionType) => {
  localStorage.setItem(SESSION, JSON.stringify(session));
};

export const updateSession = (session: Partial<SessionType>) => {
  const currentSession = getSession();
  localStorage.setItem(
    SESSION,
    JSON.stringify({ ...currentSession, ...session }),
  );
};

export const removeSession = () => {
  localStorage.removeItem(SESSION);
};
