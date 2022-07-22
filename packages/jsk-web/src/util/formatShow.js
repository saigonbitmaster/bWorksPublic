export const formatClientType = (translate, type) => {
  // console.log('formatClientType', type);
  switch (type) {
    case 'RESIDENT':
      return translate('generic.client.clientTypeChoices.resident');
    case 'ORGANIZATION':
      return translate('generic.client.clientTypeChoices.organization');
    case 'INDUSTRY':
      return translate('generic.client.clientTypeChoices.industry');
    case 'SERVICE':
      return translate('generic.client.clientTypeChoices.service');
    default:
      return '';
  }
};
export const formatClientStatus = (translate, status) => {
  // console.log('formatClientType', type);
  switch (status) {
    case 'ACTIVE':
      return translate('generic.client.statusChoices.active');
    case 'PAUSE':
      return translate('generic.client.statusChoices.pause');
    case 'STOP':
      return translate('generic.client.statusChoices.stop');
    case 'CONTRACT_SIGNED':
      return translate('generic.client.statusChoices.contractSigned');
    case 'INSTALL_WAITING':
      return translate('generic.client.statusChoices.installWaiting');
    default:
      return '';
  }
};