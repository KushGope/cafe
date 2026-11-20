export const isTokenExpired = (token) => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));

    if (!payload.exp) return true;

    return payload.exp * 1000 <= Date.now();
  } catch {
    return true;
  }
};
