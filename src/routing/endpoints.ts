export const apiHost = 'https://masya.azurewebsites.net/';

export const endpoints = {
  auth: '/auth',
};

export const dashboardEndpoints = {
  home: '/dashboard/home',
  commands: '/dashboard/commands',
  keyboards: '/dashboard/keyboards',
};

export const apiEndpoints = {
  checkPhone: apiHost + 'auth/phone',
  checkCode: apiHost + 'auth/code',
  refreshToken: apiHost + 'auth/refresh',
  getUserInfo: apiHost + 'api/user/me',

  loadCommands: apiHost + '/api/commands',
  saveCommands: apiHost + '/api/commands/save',
  removeCommand: apiHost + '/api/commands/remove/',
};
