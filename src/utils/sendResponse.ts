type TResponse<T> = {
  success?: boolean;
  message?: string;
  data?: T;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
};

export const sendResponse = <T>({
  success = true,
  message = 'Success',
  data,
  meta,
}: TResponse<T>) => {
  return {
    success,
    message,
    ...(meta && { meta }),
    ...(data !== undefined && { data }),
  };
};