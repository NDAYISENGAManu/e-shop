"use client";

import { Modal } from "antd";
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
  confirmText = "Confirm",
  cancelText = "Cancel",
}: ConfirmModalProps) {
  return (
    <Modal
      open={isOpen}
      title={
        <div className="flex items-center gap-3">
          <ExclamationCircleOutlined className="text-2xl text-yellow-500" />
          <span className="text-xl">{title}</span>
        </div>
      }
      onOk={onConfirm}
      onCancel={onCancel}
      okText={confirmText}
      cancelText={cancelText}
      okButtonProps={{ danger: true, size: "large" }}
      cancelButtonProps={{ size: "large" }}
      centered
      maskClosable={false}
    >
      <p className="text-[var(--clr-grey-3)] leading-relaxed py-4">{message}</p>
    </Modal>
  );
}
