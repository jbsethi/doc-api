import { IsArray, IsNotEmpty } from 'class-validator';

export class CreateRoleDto {
  @IsNotEmpty()
  title: string;

  @IsArray()
  permissions: string[];
}
