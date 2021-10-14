export const apiHost = 'https://masya.azurewebsites.net/';

export const endpoints = {
  auth: '/auth',
};

export const dashboardEndpoints = {
  home: '/dashboard/home',
  commands: '/dashboard/commands',
  keyboards: '/dashboard/keyboards',
  usersTable: '/dashboard/users',
  agency: '/dashboard/agency',
  agencies: '/dashboard/agencies',
  objects: '/dashboard/objects',
};

export const apiEndpoints = {
  checkPhone: apiHost + 'auth/phone',
  checkCode: apiHost + 'auth/code',
  refreshToken: apiHost + 'auth/refresh',
  getUserInfo: apiHost + 'api/users/me',

  loadCommands: apiHost + 'api/commands',
  saveCommands: apiHost + 'api/commands/save',

  loadBotSettings: apiHost + 'api/main/bot',
  saveBotSettings: apiHost + 'api/main/bot/update',
  loadBotLogs: apiHost + 'api/main/logs',
  startImporting: apiHost + 'api/main/imports/start',

  loadUsers: apiHost + 'api/users',
  saveUsers: apiHost + 'api/users/save',

  loadAgency: apiHost + 'api/agency',
  saveAgency: apiHost + 'api/agency/save',
  loadAgencyImportsLogs: apiHost + 'api/agency/import/logs',

  loadMinMax: apiHost + 'api/minmax',
  saveMinMax: apiHost + 'api/minmax/save',

  loadAgencies: '/api/agency/all',
};
