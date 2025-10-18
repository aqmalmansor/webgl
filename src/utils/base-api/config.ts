import axios, { type AxiosError, type RawAxiosRequestHeaders } from "axios";
import memoizee from "memoizee";

import { ErrorResponse } from "@app/typings";

export type BaseErrorResponse = ErrorResponse | unknown;

interface BaseApiAttributes {
  path: string;
  token?: Nullable<string>;
  raw?: boolean;
  body?: unknown;
  params?: unknown;
  headers?: Record<string, string>;
}

const getHeaders = (
  token: Nullable<string>,
  customHeaders?: Record<string, string>,
): RawAxiosRequestHeaders =>
  Object.assign(
    {
      "Content-Type": "application/json",
    },
    token && { Authorization: `Bearer ${token}` },
    customHeaders,
  ) as RawAxiosRequestHeaders;

const AxiosClient = (
  errorHandler: (
    e: AxiosError<unknown, BaseErrorResponse>,
  ) => Promise<AxiosError<unknown, BaseErrorResponse>>,
) => {
  const instance = axios.create();

  /* istanbul ignore next */
  instance.interceptors.response.use(
    (response) => response,
    (e: AxiosError): Promise<AxiosError> => errorHandler(e),
  );

  return instance;
};

const BaseApiMemo = memoizee(
  (
    getUrl: (path: string) => string,
    errorHandler: (
      e: AxiosError<unknown, BaseErrorResponse>,
    ) => Promise<AxiosError<unknown, BaseErrorResponse>>,
  ): {
    get: <T>(baseApiAttributes: BaseApiAttributes) => Promise<T>;
    post: <T>(baseApiAttributes: BaseApiAttributes) => Promise<T>;
    patch: <T>(baseApiAttributes: BaseApiAttributes) => Promise<T>;
    delete: <T>(baseApiAttributes: BaseApiAttributes) => Promise<T>;
  } => {
    const client = AxiosClient(errorHandler);

    return {
      get: <T>({
        path,
        params,
        raw,
        token = null,
        headers,
      }: BaseApiAttributes): Promise<T> =>
        new Promise((resolve, reject) =>
          client
            .get(getUrl(path), {
              params,
              headers: getHeaders(token, headers),
            })
            .then(({ data }) => resolve(raw ? data : data?.data))
            .catch((e) => {
              reject(e);
            }),
        ),
      post: <T>({
        path,
        body,
        raw,
        token = null,
        headers,
      }: BaseApiAttributes): Promise<T> =>
        new Promise((resolve, reject) =>
          client
            .post(getUrl(path), body, { headers: getHeaders(token, headers) })
            .then(({ data }) => resolve(raw ? data : data?.data))
            .catch((e) => reject(e)),
        ),
      patch: <T>({
        path,
        body,
        raw,
        token = null,
        headers,
      }: BaseApiAttributes): Promise<T> =>
        new Promise((resolve, reject) =>
          client
            .patch(getUrl(path), body, {
              headers: getHeaders(token, headers),
            })
            .then(({ data }) => resolve(raw ? data : data?.data))
            .catch((e) => reject(e)),
        ),
      delete: <T>({
        path,
        body,
        raw,
        token = null,
        headers,
      }: BaseApiAttributes): Promise<T> =>
        new Promise((resolve, reject) =>
          client
            .delete(getUrl(path), {
              headers: getHeaders(token, headers),
              data: body,
            })
            .then(({ data }) => resolve(raw ? data : data?.data))
            .catch((e) => reject(e)),
        ),
    };
  },
);

export const BaseApi = BaseApiMemo;
