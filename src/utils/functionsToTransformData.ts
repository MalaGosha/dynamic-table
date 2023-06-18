export const getPropertyNames = (data: any) => { 
    return Object.keys(data);
}

export const getValuesFromObject = (data: any) => { 
    const values = [];
    for (const value of Object.entries(data)) {
        values.push(value);
    }
    return values;
}

export const getRow = (values: any[]): any => {
    return values.reduce((obj, value) => ({ ...obj, [value[0]]: value[1] }));
};

export const getDataToTable = (dataToTable: any) => {
    const dataMap = new Map<number, any>();

    let index = 0;
    dataToTable.values.forEach((value: any) => {
        const rows = [];

        for (const property in value) {
            let row = {};

            if (value[property] === null || value[property] === undefined || value[property] === '') {
                row = {...row, ...{header: property, cellName: 'empty data'}};
            }  else if (typeof value[property] === 'boolean' || typeof value[property] === 'number') {
                const valueBoolean = value[property].toString();
                row = {...row, ...{header: property, cellName: valueBoolean}};
            } else if (typeof value[property] === 'object' && value[property] !== null) {
                row = {...row, ...{header: property, cellName: `Show ${property}`, data: value[property]}};
            } else if (typeof value[property] === 'string') {
                row = {...row, ...{header: property, cellName: value[property]}};
            } else {
                row = {...row, ...{header: property, cellName: value[property]}};
            } 
            rows.push(row);
        }

        dataMap.set(index, rows);
        index++;
    })

    return ([dataMap])
}



