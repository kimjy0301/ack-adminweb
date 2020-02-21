export default function useLocalStorage() {
  const getLocalStorage = (key: string) => {
    return localStorage.getItem(key);
  };
  const setLocalStorage = (key: string, value: any) => {
    localStorage.setItem(key, value);
  };

  return { getLocalStorage, setLocalStorage };
}
