import commonFields from '../commomFields';
export default {
  name: 'Material report',
  titleList: 'Alert',
  time: 'time',
  statusGood: 'Good',
  statusDamageField: 'Damaged',
  statusDamageAndRevoked: 'Damaged and revoked',
  statusDamageSentMaintain: 'Sent to maintain',
  expired: 'Expired',
  nearExpired: 'Near to expire',
  inValid: 'InValid',
  byMaterialStatus: 'Material status',
  byMaterialAge: 'Material age',
  sumTotalMeter: 'Sum total meter: %{val} (unit)',
  sumTotalSensor: 'Sum total sensor: %{val} (unit)',
  sumTotalDataLogger: 'Sum total dataLogger:  %{val} (unit)',
  sumTotalPump: 'Sum total pump:  %{val} (unit)',
  fields: {
    name: 'Name',
    prefix: 'Prefix',
    fullName: 'FullName',
    code: 'Code',
    population: 'Population',
    countryId: 'CountryId',
    provinceId: 'ProvinceId',
    districtId: 'DistrictId',
    position: 'Position',
    description: 'Description',
    selectType: 'Report by',
    selectCondition: 'Select filter condition',
    selectGroup: 'Select group',
    selectSource: 'Select source',
    bworksSource: 'bworks source',
    materialStatus: 'Status',
    sensor: 'Sensor',
    meter: 'Meter',
    pump: 'Pump',
    dataLogger: 'DataLogger',
    totalDevice: 'Total',
    selectMaterial: 'Select material',
    ...commonFields,
  },
  list: 'List',
  create: 'Create',
  edit: 'Edit',
  show: 'Show',
};
