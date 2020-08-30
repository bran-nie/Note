const formatTime = (date, template = 'yyyy/mm/dd hh:MM:ss') => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();

    const _padStart = (val) => {
        val = String(val).padStart(2, '0');
        return val;
    };
    let format = template
        .replace('yyyy', year)
        .replace('mm', _padStart(month))
        .replace('dd', _padStart(day))
        .replace('hh', _padStart(hour))
        .replace('MM', _padStart(minute))
        .replace('ss', _padStart(second));

    return format;
};

let fs = require('fs');
let time = formatTime(new Date());
fs.appendFileSync('commit.txt', `${time}\n\n`);
