export const apiHost = 'https://masya.azurewebsites.net/';

export const endpoints = {
  auth: '/auth',
};

export const dashboardEndpoints = {
  home: '/dashboard/home',
  commands: '/dashboard/commands',
  keyboards: '/dashboard/keyboards',
  usersTable: '/dashboard/users',
};

export const apiEndpoints = {
  checkPhone: apiHost + 'auth/phone',
  checkCode: apiHost + 'auth/code',
  refreshToken: apiHost + 'auth/refresh',
  getUserInfo: apiHost + 'api/user/me',

  loadCommands: apiHost + '/api/commands',
  saveCommands: apiHost + '/api/commands/save',

  loadBotSettings: apiHost + '/api/main/bot',
  saveBotSettings: apiHost + '/api/main/bot/update',

  loadUsers: apiHost + '/api/users',
  saveUsers: apiHost + '/api/users/save',
};
