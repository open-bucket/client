import { stat } from 'fs';

// eslint-disable-next-line import/prefer-default-export
export const directoryValidator = (rule, value, callback) => {
  stat(value, (err, oStat) => {
    if (err) {
      callback(err);
    } else if (oStat.isDirectory()) {
      callback();
    } else {
      callback(new Error('Provided string is not a directory'));
    }
  });
};
