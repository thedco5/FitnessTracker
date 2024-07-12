export const getAccessToken = (): string | null => {
    return localStorage.getItem('accessToken');
  };
  
  export const setAccessToken = (token: string): void => {
    localStorage.setItem('accessToken', token);
  };
  
  export const removeAccessToken = (): void => {
    localStorage.removeItem('accessToken');
  };
  