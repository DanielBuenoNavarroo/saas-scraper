"use server";

import prisma from "@/lib/prisma";
import { WorkflowStatus } from "@/types/workflow";
import { auth } from "@clerk/nextjs/server";

interface Props {
  id: string;
  definition: string;
}

export const UpdateWorkflow = async ({ id, definition }: Props) => {
  console.log("@UPDATEWORKFLOW");
  const { userId } = await auth();

  if (!userId) {
    throw new Error("unautenticated");
  }

  const workflow = await prisma.workflow.findUnique({
    where: {
      id,
      userId,
    },
  });

  if (!workflow) {
    throw new Error("Workflow not found");
  }
  if (workflow.status !== WorkflowStatus.DRAFT) {
    throw new Error("Workflow is not in draft mode");
  }

  await prisma.workflow.update({
    where: {
      id,
    },
    data: {
      definition: definition,
    },
  });
};
