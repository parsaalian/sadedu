export default convert = (string) => {
  return string ? string.replace(/[0-9]/g, w => ['۰','۱','۲','۳','۴','۵','۶','۷','۸','۹'][+w]) : string;
};
