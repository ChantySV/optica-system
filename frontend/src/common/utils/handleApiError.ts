import { isAxiosError } from 'axios';

export const handleApiError = (error: any, defaultMessage: string) => {
  if (isAxiosError(error)) {
    return {
      ok: false,
      message: error.response?.data?.message || defaultMessage,
    };
  }
  return { ok: false, message: defaultMessage };
};
