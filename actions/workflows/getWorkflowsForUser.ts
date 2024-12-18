"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const GetWorkflowsForUser = async () => {
  console.log('@GETWORKFLOWSFORUSER');
  const { userId } = await auth();

  if (!userId) {
    throw new Error("unautenticated");
  }

  return await prisma.workflow.findMany({
    where: {
      userId ,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
};
