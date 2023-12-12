import moment from "moment";

export const getCurrentTimeStamp = () => {
  return moment().toISOString();
};

export const formatTimeStamp = (isoTimeStamp: string) => {
  return moment(isoTimeStamp).format("LLL");
};
