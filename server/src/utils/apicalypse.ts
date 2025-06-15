type FilterOperator = '=' | '!=' | '<' | '>' | '<=' | '>=' | 'contains' | 'not contains' | 'starts with' | 'ends with';
type Filter = {
    field: string;
    operator: FilterOperator;
    value: string | number | boolean;
};

export const apicalypse = (
    fields: string | Array<string>,
    options: {
        limit?: number | null;
        offset?: number;
        where?: Filter | Array<Filter>;
    }): string => {

    let queryString = '';
    if (typeof fields !== 'string' && !Array.isArray(fields)) {
        throw new Error('Fields must be a string or an array of strings');
    }

    if (typeof fields === 'string') {
        queryString = `fields ${fields};\n`;
    } else if (Array.isArray(fields)) {
        queryString = `fields ${fields.join(', ')};\n`;
    }

    // INFO: null limit means no limit
    if (options.limit !== null ) {
        // eslint-disable-next-line no-magic-numbers
        queryString += `limit ${options.limit ?? 10};\n`;
    }

    if (options.offset) {
        queryString += `offset ${options.offset};\n`;
    }

    if (options.where) {
        let whereConditions: Array<string> = []; 
        if (Array.isArray(options.where)) {
            whereConditions = options.where.map(filter => `${filter.field} ${filter.operator} ${filter.value.toString()}`);
        } else {
            let { value } = options.where;
            if (typeof value !== 'string') {
                value = JSON.stringify(value);
            }
            whereConditions.push(`${options.where.field} ${options.where.operator} ${value}`);
        }

        whereConditions.forEach((condition, index) => {
            if (index === 0) {
                queryString += `where ${condition}`;
            } else {
                queryString += ` & ${condition}`;
            }

            if (index === whereConditions.length - 1) {
                queryString += ';\n';
            }
        });
    }

    return queryString;
};