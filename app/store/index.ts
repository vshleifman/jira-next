import {create} from "zustand";

interface DragAndDropStore {
  sourceCellId: string;
  targetTicketId: string;
  draggedFrom: string;
  droppedAt: string;
  setSourceCellId: (sourceCellId: string) => void;
  setTargetTicketId: (targetTicketId: string) => void;
  setDraggedFrom: (draggedFrom: string) => void;
  setDroppedAt: (droppedAt: string) => void;
}

export const useDragAndDropStore = create<DragAndDropStore>()((set) => ({
  sourceCellId: "",
  targetTicketId: "",
  draggedFrom: "",
  droppedAt: "",
  setSourceCellId: (sourceCellId: string) => set({sourceCellId}),
  setTargetTicketId: (targetTicketId: string) => set({targetTicketId}),
  setDraggedFrom: (draggedFrom: string) => set({draggedFrom}),
  setDroppedAt: (droppedAt: string) => set({droppedAt}),
}));
