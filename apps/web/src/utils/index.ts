import type { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

export function cn(...classes: ClassValue[]) {
  return twMerge(clsx(classes));
}

type Unit = "yr" | "mo" | "wk" | "day" | "hr" | "min" | "sec";

interface TimeAgoResult {
  value: number;
  unit: Unit;
}

const UNITS: { unit: Unit; seconds: number }[] = [
  { unit: "yr", seconds: 31536000 },
  { unit: "mo", seconds: 2592000 },
  { unit: "wk", seconds: 604800 },
  { unit: "day", seconds: 86400 },
  { unit: "hr", seconds: 3600 },
  { unit: "min", seconds: 60 },
  { unit: "sec", seconds: 1 },
];

interface TimeAgo {
  (date: Date | number | string): TimeAgoResult;
  format: (date: Date | number | string) => string;
}

function _timeAgo(date: Date | number | string): TimeAgoResult {
  const _now = new Date();
  const now = _now.getTime() - _now.getTimezoneOffset() * 60000;
  const past = new Date(date).getTime();
  const diffInSeconds = Math.floor((now - past) / 1000);

  // Default to seconds if the difference is less than 1 second
  if (diffInSeconds < 1) {
    return { value: 0, unit: "sec" };
  }

  for (const { unit, seconds } of UNITS) {
    if (diffInSeconds >= seconds) {
      const value = Math.floor(diffInSeconds / seconds);
      return { value, unit };
    }
  }

  return { value: diffInSeconds, unit: "sec" };
}

const timeAgo = _timeAgo as TimeAgo;

timeAgo.format = (date) => {
  const { value, unit } = timeAgo(date);

  return `${value}${unit}`;
};

export { timeAgo };
