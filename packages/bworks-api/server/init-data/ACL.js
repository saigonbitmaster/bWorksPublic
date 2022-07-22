module.exports = [
  {
    id: '1a1a1a1a1a1a1a1a1a101000',
    model: '*',
    property: '*',
    accessType: '*',
    permission: 'DENY',
    principalType: 'ROLE',
    principalId: '$everyone',
  },
  {
    id: '1a1a1a1a1a1a1a1a1a101004',
    model: 'AppUser',
    property: 'resetUserPassword',
    accessType: '*',
    permission: 'ALLOW',
    principalType: 'ROLE',
    principalId: '$unauthenticated',
  },
  {
    id: '1a1a1a1a1a1a1a1a1a101004',
    model: 'AppUser',
    property: 'login',
    accessType: '*',
    permission: 'ALLOW',
    principalType: 'ROLE',
    principalId: '$unauthenticated',
  },
];
