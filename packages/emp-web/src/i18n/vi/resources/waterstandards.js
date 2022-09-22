import commonFields from '../commomFields';
export default {
  name: '',
  fields: {
    name: 'Tên',
    prefix: 'Tiền tố',
    fullName: 'Tên đầy đủ',
    code: 'Mã',
    population: 'Dân số',
    countryId: 'Quốc gia',
    provinceId: 'Tỉnh / Thành phố',
    districtId: 'Quận / Huyện',
    position: 'Vị trí trung tâm',
    applyFor: 'Áp dụng cho',
    issuedDate: 'Ngày ban hành',
    issuedOrg: 'Tổ chức ban hành',
    isInValid: 'Còn hiệu lực',
    description: 'Mô tả',
    paramItemList: 'Danh sách tham số',
    sourcebworks: 'Nguồn nước thô',
    processingbworks: 'Nước trong quá trình xử lý',
    freshbworks: 'Nước sạch sau xử lý',
    processingAndFreshbworks: 'Nước sinh hoạt',
    bworksParameterId: 'Tên thông số',
    symbol: 'Ký hiệu hóa học',
    measureUnit: 'Đơn vị đo',
    value: 'giá trị',
    bworksStage: 'Áp dụng cho',
    all: 'Tất cả',
    ...commonFields,
  },
  list: 'Danh sách',
  create: 'Tạo',
  edit: 'Sửa',
  show: 'Chi tiết',
};