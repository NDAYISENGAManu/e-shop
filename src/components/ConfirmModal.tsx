"use client";

import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { ExclamationCircleOutlined } from "@ant-design/icons";

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
}

export default function ConfirmModal({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = "Delete",
  cancelText = "Cancel",
}: ConfirmModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onCancel}
      width={450}
      title={
        <div className="flex items-center gap-3 text-red-600">
          <ExclamationCircleOutlined className="text-2xl" />
          <span>{title}</span>
        </div>
      }
      footer={
        <div className="flex gap-4 justify-end">
          <Button 
            variant="ghost" 
            onClick={onCancel}
            className="!px-6"
          >
            {cancelText}
          </Button>
          <Button 
            variant="danger" 
            onClick={onConfirm}
            className="!px-6 shadow-[0_4px_12px_rgba(239,68,68,0.2)]"
          >
            {confirmText}
          </Button>
        </div>
      }
    >
      <p className="text-[#7a5838] leading-relaxed text-lg py-4">{message}</p>
    </Modal>
  );
}
