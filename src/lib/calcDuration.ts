import moment from 'moment';

export function calcDuration(dateStart: Date, dateEnd: Date) {
    const momentDateStart = moment(dateStart);
    const momentDateEnd = moment(dateEnd);

    const inYears = momentDateEnd.diff(momentDateStart, 'years');
    const inMonths = momentDateEnd.diff(momentDateStart, 'months');

    const durations = [];

    if (0 < inYears) {
        durations.push(1 < inYears ? `${inYears} years` : `${inYears} year`);
    }

    if (0 < inMonths) {
        const inMonthsReminder = inMonths < 12 ? inMonths : inMonths % 12;

        if (inMonthsReminder) {
            durations.push(1 < inMonthsReminder ? `${inMonthsReminder} months` : `${inMonthsReminder} month`);
        }
    }

    return {
        inYears,
        inMonths,
        inText: durations.join(' '),
    };
}
