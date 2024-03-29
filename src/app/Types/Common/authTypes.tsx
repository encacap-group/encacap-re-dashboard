import { IREUser } from "@encacap-group/common/dist/re";

export interface AuthTokensType {
  accessToken: string;
  refreshToken: string;
}

export interface AuthLoginFormDataType {
  email: string;
  password: string;
}

export interface AuthRegisterFormDataType {
  username: string;
  fullName: string;
  email: string | null;
  password: string;
  passwordConfirmation: string;
}

export interface AuthTokenAndUserDataType {
  user: IREUser;
  authTokens: AuthTokensType;
}
