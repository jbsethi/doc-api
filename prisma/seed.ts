import { PrismaClient } from '@prisma/client';
import * as argon from 'argon2';
import { Permission, IPermission } from '../src/permission/const';

const prisma = new PrismaClient();

async function main() {
  const hash = await argon.hash('12345');

  const allPermissions = Object.values(Permission).map(
    (permission: IPermission) => {
      return {
        title: permission,
      };
    },
  );

  const role = await prisma.role.create({
    data: {
      title: 'admin',
      users: {
        create: {
          email: 'admin@doc-app.com',
          hash,
        },
      },
      permissions: {
        createMany: {
          data: allPermissions,
        },
      },
    },
  });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
