import { create } from "zustand";

type ModalType = "createForm";

interface ModalStore {
  isOpen: boolean;
  onOpen: (modalType: ModalType) => void;
  onClose: () => void;
  modalType?: ModalType;
}

export const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  onOpen: (modalType: ModalType) => set({ isOpen: true, modalType }),
  onClose: () => set({ isOpen: false }),
}));
