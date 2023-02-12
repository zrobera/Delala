import { SetMetadata } from '@nestjs/common/decorators';
import { Role } from 'src/user/user.schema';

export const Roles_Key = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(Roles_Key, roles);
