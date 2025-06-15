import zod from 'zod/v4';

export const UserLoginResSchema = zod.object({
    success: zod.boolean(),
    error: zod.string()
        .optional(),
});

export type UserLoginResDTO = zod.infer<typeof UserLoginResSchema>;