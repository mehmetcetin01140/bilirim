
export function GetFromLocalStorage(key: string) : string | null {
  if (typeof window === "undefined") {
    return "";
  }
  return localStorage.getItem(key);
}
