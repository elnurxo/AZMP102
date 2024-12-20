const STORAGE_KEY = "userId";

export const saveUserToStorage = (userId) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(userId));
};

export const getUserFromStorage = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : null;
};

export const removeUserFromStorage = () => {
  localStorage.removeItem(STORAGE_KEY);
};
