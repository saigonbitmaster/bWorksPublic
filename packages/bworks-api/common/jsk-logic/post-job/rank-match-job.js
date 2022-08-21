//rank the bids from job seekers for a posted job
//select matched jobs for a job seeker
'use strict';
const moment = require('moment-timezone');
const {rankJob} = require('common-logics')

module.exports = PostJob => {
  PostJob.rankMatchJob = async (jobSeekerId, filter
  ) => {
    const jobs = await PostJob.app.models.PostJob.find({});
    const rankedJobs = rankJob(jobs, jobSeekerId, filter)
    return jobs;
  };

  PostJob.remoteMethod('rankMatchJob', {
    accepts: [
      { arg: 'jobSeekerId', type: 'string', required: true },
      { arg: 'filter', type: 'object' },
    ],
    http: { verb: 'get' },
    returns: { arg: 'data', type: 'object', root: true },
  });
};
