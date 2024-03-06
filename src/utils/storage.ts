type TokenType = 'access' | 'refresh';
export const getToken = (type: TokenType = 'access') => {
  let token = null;
  try {
    const item = localStorage.getItem(`sst-${type}-token`);
    if (item) token = JSON.parse(item);
  } catch (e) {
    console.log('Error retrieving token from storage');
  }

  return token;
};

export const saveAuthState = (data: Record<string, unknown>) => {
  if (data.access_token) {
    localStorage.setItem('sst-access-token', JSON.stringify(data.access_token));
  }

  if (data.refresh_token) {
    localStorage.setItem(
      'sst-refresh-token',
      JSON.stringify(data.refresh_token),
    );
  }
};

export const clearAuthState = () => {
  localStorage.removeItem('sst-access-token');
  localStorage.removeItem('sst-refresh-token');
};
