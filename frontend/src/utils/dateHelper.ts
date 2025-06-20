import { formatDate, parse } from 'date-fns';

export const formatEpochDate = (epoch: string | number, format: string = 'MM/dd/yyyy'): string => {
    const date = parse(epoch.toString(), 't', new Date());
    
    return formatDate(date, format);
};