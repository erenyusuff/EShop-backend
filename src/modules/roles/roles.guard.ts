import {ExecutionContext} from '@nestjs/common';
import {createRolesGuard} from 'nestjs-roles';
import {Role} from 'src/shared/enum/role';

function getRole(context: ExecutionContext) {
    const {session} = context.switchToHttp().getRequest();
    if (!session) {
        return;
    }
    return (session as { role?: Role | Role[] }).role;
}

export const Roles = createRolesGuard<Role>(getRole);