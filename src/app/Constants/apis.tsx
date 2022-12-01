const AUTHENTICATION_API_PATH = {
  LOGIN_PATH: '/auth/login',
  ME_PATH: '/auth/me',
  REFRESH_TOKEN_PATH: '/auth/refresh',
};

const ADMIN_CATEGORY_API_PATH = {
  CATEGORIES_PATH: '/admin/categories',
  DELETE_CATEGORY_PATH: (code: string) => `/admin/categories/${code}`,
};

export { AUTHENTICATION_API_PATH, ADMIN_CATEGORY_API_PATH };
