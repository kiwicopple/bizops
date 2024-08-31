// Function to calculate moving range
export const calculateMovingRange = (
  data: { date: string; value: number }[]
) => {
  return data.map((item, index, arr) => ({
    ...item,
    mr: index === 0 ? 0 : Math.abs(item.value - arr[index - 1].value),
  }));
};

// Function to calculate average
export const calculateAverage = (
  data: { [key: string]: any }[],
  key: string
) => {
  const sum = data.reduce((acc, item) => acc + item[key], 0);
  return sum / data.length;
};

// Function to calculate Upper and Lower Control Limits
export const calculateControlLimits = (avgX: number, avgMR: number) => {
  const NPL_SCALING = 2.66;
  const UNPL = avgX + NPL_SCALING * avgMR;
  const LNPL = avgX - NPL_SCALING * avgMR;
  return { UNPL, LNPL };
};

// Function to determine if a business rule is broken
export const checkBusinessRule = (
  data: { date: string; value: number }[],
  avg: number,
  unpl: number,
  lnpl: number
) => {
  const ruleBroken = data.some(
    (point) => point.value > unpl || point.value < lnpl
  );
  return ruleBroken
    ? "A business rule is broken. Please investigate."
    : "Business as usual.";
};

// Function to check Rule 1: Process Limit Rule
const checkProcessLimitRule = (
  data: { value: number }[],
  unpl: number,
  lnpl: number,
  mrData: { mr: number }[],
  mrUcl: number
) => {
  return (
    data.some((point) => point.value > unpl || point.value < lnpl) ||
    mrData.some((point) => point.mr > mrUcl)
  );
};

// Function to check Rule 2: Quartile Limit Rule
const checkQuartileLimitRule = (
  data: { value: number }[],
  avg: number,
  unpl: number,
  lnpl: number
) => {
  const upperQuartile = avg + (unpl - avg) / 2;
  const lowerQuartile = avg - (avg - lnpl) / 2;

  for (let i = 0; i <= data.length - 4; i++) {
    const fourPoints = data.slice(i, i + 4);
    const outsideQuartiles = fourPoints.filter(
      (point) => point.value > upperQuartile || point.value < lowerQuartile
    );
    if (outsideQuartiles.length >= 3) return true;
  }
  return false;
};

// Function to check Rule 3: Runs of Eight
const checkRunsOfEight = (data: { value: number }[], avg: number) => {
  let runLength = 0;
  let aboveAverage = null;

  for (const point of data) {
    if (aboveAverage === null) {
      aboveAverage = point.value > avg;
      runLength = 1;
    } else if (point.value > avg === aboveAverage) {
      runLength++;
      if (runLength >= 8) return true;
    } else {
      aboveAverage = !aboveAverage;
      runLength = 1;
    }
  }
  return false;
};

// Updated function to check all business rules
export const checkBusinessRules = (
  data: { date: string; value: number }[],
  avg: number,
  unpl: number,
  lnpl: number,
  mrData: { mr: number }[],
  mrUcl: number
): string[] => {
  const rule1 = checkProcessLimitRule(data, unpl, lnpl, mrData, mrUcl);
  const rule2 = checkQuartileLimitRule(data, avg, unpl, lnpl);
  const rule3 = checkRunsOfEight(data, avg);

  const brokenRules = [];
  if (rule1) brokenRules.push("Process Limit Rule");
  if (rule2) brokenRules.push("Quartile Limit Rule");
  if (rule3) brokenRules.push("Runs of Eight");

  return brokenRules;
};
