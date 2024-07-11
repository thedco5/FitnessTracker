export const getAccessToken = (): string | null => {
    return localStorage.getItem('accessToken');
};
  