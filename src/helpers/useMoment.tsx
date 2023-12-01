import moment from "moment";

export const getCurrentTimeStamp = (timeFormat: string) => {
  return moment().format(timeFormat);
};
