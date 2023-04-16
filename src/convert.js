export const getCVName = (cv) => {
    const fileName = decodeURIComponent(cv.substring(cv.lastIndexOf('/') + 1));
    return fileName.substring(0, fileName.lastIndexOf("?"));
}

export const formatMonthYear = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long' };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
    return formattedDate;
}

export const formatDateMonthYear = (dateString) => {
    const inputDate = new Date(dateString);
    const year = inputDate.getFullYear();
    const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(inputDate);
    const day = inputDate.getDate();
    let suffix = '';
    switch (day) {
        case 1:
        case 21:
        case 31:
            suffix = 'st';
            break;
        case 2:
        case 22:
            suffix = 'nd';
            break;
        case 3:
        case 23:
            suffix = 'rd';
            break;
        default:
            suffix = 'th';
            break;
    }
    return `${day}${suffix} ${month}, ${year}`;
};

export const convertCurrencyToInt = (currency) => {
    let arr = currency.split(".");
    let num = "";
    arr.forEach(e => {
        num = num + e;
    });
    return parseInt(num);
}