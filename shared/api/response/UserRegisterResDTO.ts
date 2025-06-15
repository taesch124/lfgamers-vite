import zod from 'zod/v4';

export const UserRegisterResSchema = zod.object({
    error: zod.string()
        .optional(),
    user: zod.object({
        uuid: zod.uuid(),
        username: zod.string()
            .min(6)
            .max(64),
        email: zod.email(),
        password: zod.string()
            .min(8)
            .max(64),
    }),
});

export type UserRegisterResDTO = zod.infer<typeof UserRegisterResSchema>;