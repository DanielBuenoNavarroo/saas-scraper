"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

interface Props {
  id: string;
}

export const DeleteWorkflow = async ({ id }: Props) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("unautenticated");
  }

  await prisma.workflow.delete({
    where: {
      id,
      userId,
    },
  });

  revalidatePath("/workflows");
};