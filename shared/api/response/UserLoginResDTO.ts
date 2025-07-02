import zod from 'zod/v4';
import { UserSchema } from '../../databaseDTO/user';

export const UserLoginResSchema = zod.object({
    success: zod.boolean(),
    error: zod.string()
        .optional(),
    user: UserSchema,
});

export type UserLoginResDTO = zod.infer<typeof UserLoginResSchema>;