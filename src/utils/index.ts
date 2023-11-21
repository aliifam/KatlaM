// export const copyArray = <T>(arr: T[][]): T[][] => {
//     return [...arr.map(rows => [...rows])];
// };

export const copyArray = (arr: string[][]) => {
    return [...arr.map(rows => [...rows])];
};

export const getDayOfTheYear = (): number => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff =
        now.getTime() -
        start.getTime() +
        (start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000;
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
};
