import { AppNode } from "@/types/appNode";
import { TaskType } from "@/types/task";

interface Props {
  nodeType: TaskType;
  position?: { x: number; y: number };
}

export const CreateFlowNode = ({ nodeType, position }: Props): AppNode => {
  return {
    id: crypto.randomUUID(),
    type: "FlowScrapeNode",
    dragHandle: ".drag-handle",
    data: {
      type: nodeType,
      inputs: {},
    },
    position: position ?? { x: 0, y: 0 },
  };
};
