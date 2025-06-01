import { customAlphabet } from "nanoid";
import { Request } from "express"
import { COOKIE_REF_TOKEN } from "./constants";

const alphabet =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

export const generateRandomBytes = (length?: number) => {
  const bytesLength = length ?? 10;
  const generateId = customAlphabet(alphabet, bytesLength);
  const result = generateId();
  return result;
};

export const setExpiryDate = (
  number: number,
  marker: "hours" | "minutes" | "days"
) => {
  let multiply = 1000; // 1 second
  switch (marker) {
    case "days":
      multiply = 1000 * 60 * 60 * 24;
      break;
    case "hours":
      multiply = 1000 * 60 * 60;
      break;
    case "minutes":
      multiply = 1000 * 60;
      break;
    default:
      break;
  }
  return new Date(Date.now() + multiply * number);
};

type TCookieType = 'refresh-token';
export const getCookie = (req: Request, type: TCookieType) => {
  let value: string | undefined;
  let name: string | undefined;
  switch (type) {
    case 'refresh-token':
      value = req.cookies[COOKIE_REF_TOKEN];
      name = COOKIE_REF_TOKEN;
      break;
    default:
      value = undefined;
      name = undefined;
      break;
  }
  return { value, name };
};