import zod from 'zod/v4';

export const UserRegisterReqSchema = zod.object({
    username: zod.string()
        .min(6)
        .max(64),
    email: zod.email(),
    password: zod.string()
        .min(8)
        .max(64),
});

export type UserRegisterReqDTO = zod.infer<typeof UserRegisterReqSchema>;