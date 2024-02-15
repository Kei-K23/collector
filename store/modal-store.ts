import { DetailFormData } from "@/type";
import { create } from "zustand";

type ModalType = "createForm" | "updateForm" | "deleteForm";

type ModalData = {
  form?: DetailFormData | null;
};

interface ModalStore {
  isOpen: boolean;
  onOpen: (modalType: ModalType, modalData?: ModalData) => void;
  onClose: () => void;
  modalType?: ModalType;
  modalData?: ModalData | null;
}

export const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  onOpen: (modalType: ModalType, modalData?: ModalData) =>
    set({ isOpen: true, modalType, modalData }),
  onClose: () => set({ isOpen: false, modalData: null }),
}));
