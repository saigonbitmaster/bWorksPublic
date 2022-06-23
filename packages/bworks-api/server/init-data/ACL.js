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
    id: '1a1a1a1a1a1a1a1a1a101001',
    model: '*',
    property: '*',
    accessType: '*',
    permission: 'ALLOW',
    principalType: 'ROLE',
    principalId: 'master',
  },
  {
    id: '1a1a1a1a1a1a1a1a1a101002',
    model: 'AppUser',
    property: '*',
    accessType: '*',
    permission: 'ALLOW',
    principalType: 'ROLE',
    principalId: 'master',
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
    id: '1a1a1a1a1a1a1a1a1a101005',
    model: '*',
    property: '*',
    accessType: '*',
    permission: 'ALLOW',
    principalType: 'ROLE',
    principalId: 'admin',
  },
  {
    id: '1a1a1a1a1a1a1a1a1a101006',
    model: 'AppUser',
    property: '*',
    accessType: '*',
    permission: 'ALLOW',
    principalType: 'ROLE',
    principalId: 'admin',
  },
];
