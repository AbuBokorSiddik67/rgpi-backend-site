import pino from 'pino';

const logger = pino({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true, // টার্মিনালে রঙিন টেক্সট দেখাবে
      translateTime: 'SYS:standard', // পড়ার সুবিধা অনুযায়ী টাইমস্ট্যাম্প দেখাবে
      ignore: 'pid,hostname', 
    },
  },
});

export default logger;