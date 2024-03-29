import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { UNAUTHORIZED } from "http-status";
import _ from "lodash";

import { AUTHENTICATION_PATH } from "@constants/urls";
import { authService } from "@services/index";

const errorHandler = async (
  error: { response: AxiosResponse; config: AxiosRequestConfig },
  instance: AxiosInstance,
) => {
  const { response, config } = error;

  let redirectURL = "";

  const redirectWhenError = config?.redirectWhenError;

  if (_.keys(response).length !== 0) {
    const { status } = response;
    const autoRefreshToken = config?.autoRefreshToken;

    if (autoRefreshToken !== false) {
      if (status === UNAUTHORIZED) {
        const { refreshToken } = authService.getAuthTokens();
        if (refreshToken !== null) {
          try {
            const newTokens = await authService.refreshAccessToken(refreshToken);
            authService.setAuthTokens(newTokens.accessToken, newTokens.refreshToken);
            config.headers = {
              ...config.headers,
              Authorization: `Bearer ${String(newTokens.accessToken)}`,
            };
            config.autoRefreshToken = false;
            // #skipcq: JS-0379
            return await instance?.(config);
          } catch (refreshError) {
            redirectURL = AUTHENTICATION_PATH.LOGIN_PATH;
          }
        } else {
          redirectURL = AUTHENTICATION_PATH.LOGIN_PATH;
        }
      }
    } else if (redirectWhenError !== false) {
      switch (status) {
        case UNAUTHORIZED: {
          redirectURL = AUTHENTICATION_PATH.LOGIN_PATH;
          break;
        }
        default:
          break;
      }
    }
  }

  if (redirectURL !== "" && (redirectWhenError ?? false)) {
    const currentURL = window.location.pathname;
    if (currentURL !== redirectURL) {
      window.location.href = `${redirectURL}?from=${currentURL}`;
    }
  }

  return Promise.reject(error);
};

export default errorHandler;
