import commonFields from '../commomFields';
export default {
  name: 'Alert threshold',
  fields: {
    name: 'Name',
    prefix: 'Prefix',
    fullName: 'fullName',
    code: 'Code',
    population: 'Population',
    countryId: 'CountryId',
    provinceId: 'ProvinceId',
    districtId: 'DistrictId',
    position: 'Position',
    alertType: 'AlertType',
    alertHigh: 'High alert (>=)',
    alertCriticalHigh: 'Critical high alert (>=)',
    alertLow: 'Low alert (=<)',
    alertCriticalLow: 'Critical low alert (=<)',
    description: 'Description',
    bworksParameterId: 'bworks parameter',
    bworksSourceId: 'bworks source',
    alertParam: 'Alert parameter',
    alertVolumeLow: 'Low alert threshold (%, =<)',
    alertVolumeCriticalLow: 'Critical low alert threshold (%, =<)',
    alertVolumeHigh: 'High alert threshold (%, >=)',
    alertVolumeCriticalHigh: 'Very high alert threshold (%, >=)',
    alertFlowLow: 'Low alert threshold (m³/h, =<)',
    alertFlowCriticalLow: 'Very low alert threshold (m³/h, =<)',
    alertFlowHigh: 'High alert threshold (m³/h, >=)',
    alertFlowCriticalHigh: 'Very high alert threshold (m³/h, >=)',
    ...commonFields,
  },
  list: 'List',
  create: 'Create',
  edit: 'Edit',
  show: 'Show',
  alertHigh: 'High alert',
  alertLow: 'Low alert',
  alertHighAndLow: 'High and low alert',
  alertQuality: 'Quality',
  alertFlow: 'Flow',
  alertVolume: 'Volume',
};
