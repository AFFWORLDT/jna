import Cookies from "js-cookie";

interface CookieOptions {
  expires: number;
  secure: boolean;
  sameSite: "strict" | "lax" | "none";
  path: string;
}

const defaultOptions: CookieOptions = {
  secure: true,
  sameSite: "strict",
  path: "/",
  expires: 20,
};

export const setCookies = (accessToken: string) => {
  Cookies.set("accessToken", accessToken, {
    ...defaultOptions,
    expires: 7,
  });
};

export const clearCookies = () => {
  const options = { path: "/" };
  Cookies.remove("accessToken", options);
};

export const getCookie = () => {
  try {
    const value = Cookies.get("accessToken");
    return value;
  } catch {
    return null;
  }
};
