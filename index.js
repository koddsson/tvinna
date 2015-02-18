var _ = require('lodash');
var xray = require('x-ray');

module.exports = function(cb) {
  xray('http://tvinna.is')
    .select([{
      $root: ".job",
      title: '.job-href',
      company: '.title',
      location: '.location',
      url: '.job-href[href]',
      type: '.job-type'
    }])
    .run(function(err, array) {
      var cleaned = _.map(array, function(job) {
        job.company = job.company.split('\r\n')[1].trim();
        return job;
      });
      cb(err, cleaned);
    });
};
