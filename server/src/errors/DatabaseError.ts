export default class DatabaseError extends Error {
    model: string;
    constructor(message: string, model: string) {
        super(message);
        this.model = model;
        this.name = 'DatabaseError';
    }
};