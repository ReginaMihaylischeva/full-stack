const bunyan = require('bunyan');
const logger = bunyan.createLogger({
    name:'social network',

   streams: [{
         level: 'error',
         type: 'rotating-file',
         path: 'C:/Thumbtack/thumbtack-sunday-school/Project/project-template-2018/error.log',
         period: '1d',
         count: 2
   },
   {
          level: 'warn',
          type: 'rotating-file',
          path: 'C:/Thumbtack/thumbtack-sunday-school/Project/project-template-2018/warn.log',
          period: '1d',
          count: 2
   },
   {
          level:'trace',
          type: 'rotating-file',
          path: 'C:/Thumbtack/thumbtack-sunday-school/Project/project-template-2018/trace.log',
          period: '1d',
          count: 2
   }
   ]
});

module.exports = logger;