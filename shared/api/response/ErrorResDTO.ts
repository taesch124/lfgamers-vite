import zod from 'zod/v4';

export const ErrorResSchema = zod.object({
    error: zod.string(),
});

export type ErrorResDTO = zod.infer<typeof ErrorResSchema>;