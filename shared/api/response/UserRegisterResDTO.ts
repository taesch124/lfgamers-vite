import zod from 'zod/v4';
import { UserSchema } from '../../databaseDTO/user';

export const UserRegisterResSchema = zod.object({
    success: zod.boolean(),
    error: zod.string()
        .optional(),
    user: UserSchema,
});

export type UserRegisterResDTO = zod.infer<typeof UserRegisterResSchema>;