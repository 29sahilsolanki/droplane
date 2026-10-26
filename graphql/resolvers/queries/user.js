import { prisma } from "../../../lib/prisma";

export const user = (_parent, { id }) =>
  prisma.user.findUnique({ where: { id } });
