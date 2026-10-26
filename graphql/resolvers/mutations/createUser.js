import { GraphQLError } from "graphql";
import { prisma } from "../../../lib/prisma";

export const createUser = async (_parent, { input }) => {
  const email = input.email.trim().toLowerCase();

  try {
    // role is left out on purpose so it always defaults to CUSTOMER
    return await prisma.user.create({
      data: { auth0Id: input.auth0Id, email, name: input.name },
    });
  } catch (error) {
    // P2002 is Prisma's unique constraint error (auth0Id or email already taken)
    if (error.code === "P2002") {
      throw new GraphQLError("A user with this email or Auth0 ID already exists", {
        extensions: { code: "USER_ALREADY_EXISTS" },
      });
    }
    throw error;
  }
};
