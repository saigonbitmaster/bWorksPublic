//rank the bids from job seekers for a posted job
//select matched jobs for a job seeker
'use strict';
const moment = require('moment-timezone');
const {rankBid} = require('common-logics')
module.exports = BiddingJob => {
  BiddingJob.rankBid = async (jobId, filter
  ) => {
    const bids = await BiddingJob.find({});
    let rankedJobs = rankBid(bids, jobId, filter);
    return rankedJobs;
  };

  BiddingJob.remoteMethod('rankBid', {
    accepts: [
      { arg: 'jobId', type: 'string', required: true },
      { arg: 'filter', type: 'object' },
    ],
    http: { verb: 'get' },
    returns: { arg: 'data', type: 'object', root: true },
  });
};
