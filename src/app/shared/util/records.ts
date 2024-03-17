import { TimePeriodDuration } from "../enums/time-period-duration.enum";

export const monthMap: Record<number, string> = {
    0: "January",
    1: "February",
    2: "March",
    3: "April",
    4: "May",
    5: "June",
    6: "July",
    7: "August",
    8: "September",
    9: "October",
    10: "November",
    11: "December"
};

export const monthToDuration: Record<number, TimePeriodDuration> = {
    0: TimePeriodDuration.JANUARY,
    1: TimePeriodDuration.FEBRUARY,
    2: TimePeriodDuration.MARCH,
    3: TimePeriodDuration.APRIL,
    4: TimePeriodDuration.MAY,
    5: TimePeriodDuration.JUNE,
    6: TimePeriodDuration.JULY,
    7: TimePeriodDuration.AUGUST,
    8: TimePeriodDuration.SEPTEMBER,
    9: TimePeriodDuration.OCTOBER,
    10: TimePeriodDuration.NOVEMBER,
    11: TimePeriodDuration.DECEMBER
};