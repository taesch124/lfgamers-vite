import zod from 'zod/v4';

export const UserLoginReqSchema = zod.object({
    username: zod.string()
        .min(6)
        .max(64),
    password: zod.string()
        .min(8)
        .max(64),
});

export type UserLoginReqDTO = zod.infer<typeof UserLoginReqSchema>;