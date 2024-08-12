import {create} from "zustand";

interface DragAndDropStore {
  sourceCellId: string;
  targetTicketId: string;
  setSourceCellId: (sourceCellId: string) => void;
  setTargetTicketId: (targetTicketId: string) => void;
}

export const useDragAndDropStore = create<DragAndDropStore>()((set) => ({
  sourceCellId: "",
  targetTicketId: "",
  setSourceCellId: (sourceCellId: string) => set({sourceCellId}),
  setTargetTicketId: (targetTicketId: string) => set({targetTicketId}),
}));
