// Copyright IBM Corp. 2014,2016. All Rights Reserved.
// Node module: loopback-component-storage
// This file is licensed under the Artistic License 2.0.
// License text available at https://opensource.org/licenses/Artistic-2.0
'use strict';

var factory = require('./factory');
var handler = require('./storage-handler');

var storage = require('pkgcloud').storage;
var debug = require('debug')('loopback:storage:service');

module.exports = StorageService;

StorageService.prototype.getModelFolder = (ctx) => {
  if (this.folder) return this.folder;
  let folder = ctx.methodString;
  folder = folder.substr(0, folder.indexOf('.'));
  return folder + 's';
};

StorageService.prototype.getModelContainer = (instance) => {
  if(this.container) return this.container;
  return instance.client.config.container || instance.client.config.bucket;
};

/**
 * Storage service constructor.  Properties of options object depend on the storage service provider.
 *
 * @options {Object} options Options to create a provider; see below.
 * @prop {String} provider Storage service provider. Must be one of:
 * <ul><li>'filesystem' - local file system.</li>
 * <li>'amazon'</li>
 * <li>'rackspace'</li>
 * <li>'azure'</li>
 * <li>'openstack'</li>
 * </ul>
 *
 * Other supported values depend on the provider.
 * See the [documentation](https://docs.strongloop.com/display/LB/Storage+component) for more information.
 * @class
 */
function StorageService(options) {
  if (!(this instanceof StorageService)) {
    return new StorageService(options);
  }
  this.provider = options.provider;
  this.client = factory.createClient(options);
  this.container = options.bucket;
  this.folder = options.options.prefix;
  if ('function' === typeof options.getFilename) {
    this.getFilename = options.getFilename;
  }
  if (options.acl) {
    this.acl = options.acl;
  }
  if (options.allowedContentTypes) {
    this.allowedContentTypes = options.allowedContentTypes;
  }
  if (options.maxFileSize) {
    this.maxFileSize = options.maxFileSize;
  }
  if (options.nameConflict) {
    this.nameConflict = options.nameConflict;
  }
  if (options.maxFieldsSize) {
    this.maxFieldsSize = options.maxFieldsSize;
  }
}

function map(obj) {
  return obj;
}

/**
 * List all storage service containers.
 * @callback {Function} callback Callback function
 * @param {Object|String} err Error string or object
 * @param {Object[]} containers An array of container metadata objects
 */
StorageService.prototype.getContainers = function(cb) {
  this.client.getContainers(function(err, containers) {
    if (err) {
      cb(err, containers);
    } else {
      cb(err, containers.map(function(c) {
        return map(c);
      }));
    }
  });
};

/**
 * Create a new storage service container.
 *
 * @options {Object} options Options to create a container. Option properties depend on the provider.
 * @prop {String} name Container name
 * @callback {Function} cb Callback function
 * @param {Object|String} err Error string or object
 * @param {Object} container Container metadata object
 */

StorageService.prototype.createContainer = function(options, cb) {
  options = options || {};
  if ('object' === typeof options && !(options instanceof storage.Container)) {
    options.Name = options.name; // Amazon expects Name
    var Container = factory.getProvider(this.provider).storage.Container;
    options = new Container(this.client, options);
  }
  debug('Creating container with options %o', options);
  return this.client.createContainer(options, function(err, container) {
    return cb(err, map(container));
  });
};

/**
 * Destroy an existing storage service container.
 * @param {String} container Container name.
 * @callback {Function} callback Callback function.
 * @param {Object|String} err Error string or object
 */
StorageService.prototype.destroyContainer = function(container, cb) {
  return this.client.destroyContainer(container, cb);
};

/**
 * Look up a container metadata object by name.
 * @param {String} container Container name.
 * @callback {Function} callback Callback function.
 * @param {Object|String} err Error string or object
 * @param {Object} container Container metadata object
 */
StorageService.prototype.getContainer = function(container, cb) {
  return this.client.getContainer(container, function(err, container) {
    if (err && err.code === 'ENOENT') {
      err.statusCode = err.status = 404;
      return cb(err);
    }
    return cb(err, map(container));
  });
};

/**
 * Get the stream for uploading
 * @param {String} container Container name
 * @param {String} file  File name
 * @options {Object} [options] Options for uploading
 * @callback callback Callback function
 * @param {String|Object} err Error string or object
 * @returns {Stream} Stream for uploading
 */
StorageService.prototype.uploadStream = function(container, file, options) {
  if (typeof options === 'function') {
    options = {};
  }
  options = options || {};
  if (container) {
    options.container = container;
  }
  if (file) {
    options.remote = file;
  }
  debug('Obtaining upload stream for file %s and options %o', file, options);
  return this.client.upload(options);
};

/**
 * Get the stream for downloading.
 * @param {String} container Container name.
 * @param {String} file File name.
 * @options {Object} options Options for downloading
 * @callback {Function} callback Callback function
 * @param {String|Object} err Error string or object
 * @returns {Stream} Stream for downloading
 */
StorageService.prototype.downloadStream = function(container, file, options) {
  if (typeof options === 'function') {
    options = {};
  }
  options = options || {};

  if (!container) {
    container = this.container;
  } 
  options.container = this.container;
  let folder = this.folder;
  if (file) {
    if (file.indexOf(folder + '/') != 0) {
      file = `${folder}/${file}`;
    }
    options.remote = file;
  }
  debug('Obtaining download stream for file %s and options %o', file, options);
  return this.client.download(options);
};

/**
 * List all files within the given container.
 * @param {String} container Container name.
 * @param {Object} [options] Options for download
 * @callback {Function} cb Callback function
 * @param {Object|String} err Error string or object
 * @param {Object[]} files An array of file metadata objects
 */
StorageService.prototype.getFiles = function(ctx, options, cb) {
  if (typeof options === 'function' && !cb) {
    // options argument is not present
    cb = options;
    options = {};
  }
  let container = this.getModelContainer(this);
  options.prefix = this.getModelFolder(ctx);
  return this.client.getFiles(container, options, function(err, files) {
    if (err) {
      cb(err, files);
    } else {
      cb(err, files.filter(f=>f.size).map((f) =>map(f)));
    }
  });
};

/**
 * Look up the metadata object for a file by name
 * @param {String} container Container name
 * @param {String} file File name
 * @callback {Function} cb Callback function
 * @param {Object|String} err Error string or object
 * @param {Object} file File metadata object
 */
StorageService.prototype.getFile = function(ctx, file, cb) {
  let container = this.getModelContainer(this);
  return this.client.getFile(container, file, function(err, f) {
    if (err && err.code === 'ENOENT') {
      err.statusCode = err.status = 404;
      return cb(err);
    }
    return cb(err, map(f));
  });
};

/**
 * Remove an existing file
 * @param {String} container Container name
 * @param {String} file File name
 * @callback {Function} cb Callback function
 * @param {Object|String} err Error string or object
 */
StorageService.prototype.removeFile = function(ctx, file, cb) {
  let container = this.getModelContainer(this);
  file = `${this.getModelFolder(ctx)}/${file}`;
  return this.client.removeFile(container, file, cb);
};

/**
 * Upload middleware for the HTTP request/response  <!-- Should this be documented? -->
 * @param {String} [container] Container name
 * @param {Request} req Request object
 * @param {Response} res Response object
 * @param {Object} [options] Options for upload
 * @param {Function} cb Callback function
 */
StorageService.prototype.upload = function(ctx, req, res, options, cb, extOptions = {}) {
  debug('Configuring upload with options %o', options);
  // Test if container is req for backward compatibility
  let container = this.getModelContainer(this);
  if (typeof container === 'object' && container.url && container.method) {
    // First argument is req, shift all args
    cb = options;
    options = res;
    res = req;
    req = container;
  }
  if (!cb && 'function' === typeof options) {
    cb = options;
    options = {};
  }
  options.prefix = this.getModelFolder(ctx);
  if(extOptions && Object.keys(extOptions).length) {
    options = {...options, ...extOptions};
  }
  if (this.getFilename && !options.getFilename) {
    options.getFilename = this.getFilename;
  }
  if (this.acl && !options.acl) {
    options.acl = this.acl;
  }
  if (this.allowedContentTypes && !options.allowedContentTypes) {
    options.allowedContentTypes = this.allowedContentTypes;
  }
  if (this.maxFileSize && !options.maxFileSize) {
    options.maxFileSize = this.maxFileSize;
  }
  if (this.nameConflict && !options.nameConflict) {
    options.nameConflict = this.nameConflict;
  }
  if (this.maxFieldsSize && !options.maxFieldsSize) {
    options.maxFieldsSize = this.maxFieldsSize;
  }
  if (typeof container === 'string') {
    options.container = container;
  }
  debug('Upload configured with options %o', options);
  return handler.upload(this.client, req, res, options, cb);
};

StorageService.prototype.uploadPublic = function(ctx, req, res, options, cb) {
  return this.upload(ctx, req, res, options, cb, {
    acl: "public-read",
    // headers: {
    //   'x-amz-acl': 'public-read'
    // }
  });
}

/**
 * Download middleware
 * @param {String} container Container name
 * @param {String} file File name
 * @param {Request} req HTTP request
 * @param {Response} res HTTP response
 * @param {Function} cb Callback function
 */
StorageService.prototype.download = function(ctx, file, req, res, cb) {
  let container = this.getModelContainer(this);
  let folder = this.getModelFolder(ctx);
  if (file.indexOf(folder + '/') != 0) {
    file = `${folder}/${file}`;
  }
  return handler.download(this.client, req, res, container, file, cb);
};

StorageService.modelName = 'storage';

// StorageService.prototype.getContainers.shared = true;
// StorageService.prototype.getContainers.accepts = [];
// StorageService.prototype.getContainers.returns = {
//   arg: 'containers',
//   type: 'array',
//   root: true,
// };
// StorageService.prototype.getContainers.http =
// {verb: 'get', path: '/'};
//
// StorageService.prototype.getContainer.shared = true;
// StorageService.prototype.getContainer.accepts = [
//   {arg: 'container', type: 'string', required: true, 'http': {source: 'path'}},
// ];
// StorageService.prototype.getContainer.returns = {
//   arg: 'container',
//   type: 'object', root: true,
// };
// StorageService.prototype.getContainer.http =
// {verb: 'get', path: '/:container'};
//
// StorageService.prototype.createContainer.shared = true;
// StorageService.prototype.createContainer.accepts = [
//   {arg: 'options', type: 'object', http: {source: 'body'}},
// ];
// StorageService.prototype.createContainer.returns = {
//   arg: 'container',
//   type: 'object', root: true,
// };
// StorageService.prototype.createContainer.http =
// {verb: 'post', path: '/'};
//
// StorageService.prototype.destroyContainer.shared = true;
// StorageService.prototype.destroyContainer.accepts = [
//   {arg: 'container', type: 'string', required: true, 'http': {source: 'path'}},
// ];
// StorageService.prototype.destroyContainer.returns = {};
// StorageService.prototype.destroyContainer.http =
// {verb: 'delete', path: '/:container'};

StorageService.prototype.getFiles.shared = true;
StorageService.prototype.getFiles.accepts = [
  {arg: 'ctx', type: 'object', 'http': {source: 'context'}},
];
StorageService.prototype.getFiles.returns = {arg: 'files', type: 'array', root: true};
StorageService.prototype.getFiles.http =
{verb: 'get', path: '/files'};

StorageService.prototype.getFile.shared = true;
StorageService.prototype.getFile.accepts = [
  {arg: 'ctx', type: 'object', 'http': {source: 'context'}},
  {arg: 'file', type: 'string', required: true, 'http': {source: 'path'}},
];
StorageService.prototype.getFile.returns = {arg: 'file', type: 'object', root: true};
StorageService.prototype.getFile.http =
{verb: 'get', path: '/files/:file'};

StorageService.prototype.removeFile.shared = true;
StorageService.prototype.removeFile.accepts = [
  {arg: 'ctx', type: 'object', 'http': {source: 'context'}},
  {arg: 'file', type: 'string', required: true, 'http': {source: 'path'}},
];
StorageService.prototype.removeFile.returns = {};
StorageService.prototype.removeFile.http =
{verb: 'delete', path: '/files/:file'};

StorageService.prototype.upload.shared = true;
StorageService.prototype.upload.accepts = [
  {arg: 'ctx', type: 'object', 'http': {source: 'context'}},
  {arg: 'req', type: 'object', 'http': {source: 'req'}},
  {arg: 'res', type: 'object', 'http': {source: 'res'}},
];
StorageService.prototype.upload.returns = {arg: 'result', type: 'object'};
StorageService.prototype.upload.http =
{verb: 'post', path: '/upload'};

StorageService.prototype.uploadPublic.shared = true;
StorageService.prototype.uploadPublic.accepts = [
  {arg: 'ctx', type: 'object', 'http': {source: 'context'}},
  {arg: 'req', type: 'object', 'http': {source: 'req'}},
  {arg: 'res', type: 'object', 'http': {source: 'res'}},
];
StorageService.prototype.uploadPublic.returns = {arg: 'result', type: 'object'};
StorageService.prototype.uploadPublic.http =
{verb: 'post', path: '/uploadPublic'};

StorageService.prototype.download.shared = true;
StorageService.prototype.download.accepts = [
  {arg: 'ctx', type: 'object', 'http': {source: 'context'}},
  {arg: 'file', type: 'string', required: true, 'http': {source: 'path'}},
  {arg: 'req', type: 'object', 'http': {source: 'req'}},
  {arg: 'res', type: 'object', 'http': {source: 'res'}},
];
StorageService.prototype.download.http =
{verb: 'get', path: '/download/:file'};
