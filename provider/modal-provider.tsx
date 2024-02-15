"use client";
import { CreateFormModal } from "@/components/modal/form-create-modal";
import { UpdateFormModal } from "@/components/modal/form-update-modal";
import React, { useEffect, useState } from "react";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, [isMounted]);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CreateFormModal />
      <UpdateFormModal />
    </>
  );
};

export default ModalProvider;
