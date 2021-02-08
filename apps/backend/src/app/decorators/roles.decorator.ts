import { SetMetadata } from '@nestjs/common';
import { RolesEnum } from '../enums/roles.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: RolesEnum[]) => SetMetadata(ROLES_KEY, true);

/*Usage*/
/* @Post()
  @Roles(Role.Admin)
  create(@Body() createCatDto: CreateCatDto) {
    this.testService.create(createCatDto);
  }
*/
