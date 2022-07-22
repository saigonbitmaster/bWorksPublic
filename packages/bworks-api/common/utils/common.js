let utilCommon = {};
const _ = require('lodash');
const moment = require('moment-timezone');
const ObjectID = require('mongodb').ObjectID;

utilCommon.getIdUnique = function(data, field = 'id', isObjectId = true) {
  let temp = [];
  for (let i = 0; i < data.length; i++) {
    let flg = utilCommon.checkExistId(temp, data[i], field, isObjectId);
    if (!flg && data[i][field]) {
      temp.push(data[i][field]);
    }
  }
  return temp;
};
utilCommon.checkExistId = function(data, key, field = 'id', isObjectId) {
  for (let i = 0; i < data.length; i++) {
    if (isObjectId) {
      if (data[i] && key[field] && data[i].equals(key[field])) {
        return true;
      }
    } else {
      if (data[i] && key[field] && data[i] === key[field]) {
        return true;
      }
    }
  }
  return false;
};

// lay data duy nhat
utilCommon.getDataUnique = function(data, field) {
  let temp = [];
  for (let i = 0; i < data.length; i++) {
    let flg = utilCommon.checkExistData(temp, data[i], field);
    if (!flg && data[i][field]) {
      temp.push(data[i][field]);
    }
  }
  return temp;
};
utilCommon.checkExistData = function(data, key, field) {
  for (let i = 0; i < data.length; i++) {
    if (data[i] && key[field] && data[i] === key[field]) {
      return true;
    }
  }
  return false;
};


// phan trang
utilCommon.splitPage = function(data, limit, skip) {
  let page = skip / limit + 1;
  let perPage = limit;
  return data.slice((page - 1) * perPage, page * perPage);
};

// sort
utilCommon.sort = function(data, order) {
  let fieldSort = '';
  let typeSort = '';
  if (order.length === 1) {
    let tmp = order[0].split(' ');
    if (tmp.length === 2) {
      fieldSort = tmp[0];
      typeSort = tmp[1];
    }
  }
  if (!fieldSort || !typeSort) {
    return data;
  }
  let tmp = [];
  if (typeSort === 'ASC') {
    tmp = _.sortBy(data, [fieldSort]);
  } else if (typeSort === 'DESC') {
    tmp = _.sortBy(data, [fieldSort]).reverse();
  }
  return tmp;
};

utilCommon.sortFieldSpec = function(data, withFields, order) {
  let fieldSort = '';
  let typeSort = '';
  if (!order) {
    return data;
  }
  if (order.length === 1) {
    let tmp = order[0].split(' ');
    if (tmp.length === 2) {
      fieldSort = tmp[0];
      typeSort = tmp[1];
    }
  }
  if (!fieldSort || !typeSort || !_.includes(withFields, fieldSort)) {
    return data;
  }
  let tmp = [];
  if (typeSort === 'ASC') {
    tmp = _.sortBy(data, [fieldSort]);
  } else if (typeSort === 'DESC') {
    tmp = _.sortBy(data, [fieldSort]).reverse();
  }
  return tmp;
};

utilCommon.compareMonth = function(src, dst) {
  if (!src || !dst) {
    return '';
  }
  let srcYear = moment(src).year();
  let dstYear = moment(dst).year();
  let srcMonth = moment(src).month() + 1;
  let dstMonth = moment(dst).month() + 1;
  if (srcYear < dstYear) {
    return -1;
  } else if (srcYear > dstYear) {
    return 1;
  } else if (srcMonth < dstMonth) {
    return -1;
  } else if (srcMonth > dstMonth) {
    return 1;
  } else return 0;
};
utilCommon.checkConditionGeo = function(provinceId, districtId, wardId, quarterId) {
  if (quarterId && (!provinceId || !districtId || !wardId)) {
    return false;
  }
  if (wardId && (!provinceId || !districtId || !wardId)) {
    return false;
  }
};

// sort, phan trang, get group
utilCommon.filterData = function(filter, data, res) {
  const { limit = 25, skip = 0, order } = filter;
  if (!data.length) {
    if (res) res.header('content-range', 0);
    return [];
  }
  // phan trang
  let dataTmp = utilCommon.splitPage(data, limit, skip);

  // sort
  let sortedData = dataTmp;
  if (order) {
    sortedData = utilCommon.sort(dataTmp, order);
  }
  if (res) res.header('content-range', data.length);
  return sortedData;
};

// dem so ngay trong thang/nam
// input: time : moment
utilCommon.countDays = function(time, type = 'month') {
  let res = 1;
  if (type === 'month') {
    res = time.daysInMonth();
  } else if (type === 'year') {
    res = 365;
    let year = parseInt(time.format('YYYY'));
    if (year % 4 === 0 || year % 400 === 0) {
      res = 366;
    }
  }
  return res;
};
utilCommon.getAgrFilter = function(filter) {
  let res = {};
  const { limit, skip, order } = filter;
  if (!order) {
    return res;
  }
  // res.push({ $limit: parseInt(limit) }, { $skip: parseInt(skip) });
  res.limit = parseInt(limit);
  res.skip = parseInt(skip);
  let fieldSort = '';
  let typeSort = '';
  if (order.length === 1) {
    let tmp = order[0].split(' ');
    if (tmp.length === 2) {
      fieldSort = tmp[0];
      typeSort = tmp[1];
    }
  }
  if (!fieldSort || !typeSort) {
    return res;
  }
  let tmp = {};
  if (typeSort === 'ASC') {
    tmp[fieldSort] = 1;
  } else if (typeSort === 'DESC') {
    tmp[fieldSort] = -1;
  }
  // res.push({ $sort: tmp });
  res.sort = tmp;
  return res;
};
utilCommon.convertObjectId = function(data) {
  let ids = data.map(id => {
    return typeof id === 'string' ? ObjectID(id) : id;
  });
  return ids;
};
module.exports = utilCommon;
