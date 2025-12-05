"use client";

import { useState } from "react";
import { Modal, Input, Button, Typography } from "antd";
import axios from "axios";
import { useNotification } from "./Notification";

const { Title, Text } = Typography;

interface ChangePasswordModalProps {
  onPasswordChanged: () => void;
  onSkip: () => void;
}

export default function ChangePasswordModal({
  onPasswordChanged,
  onSkip,
}: ChangePasswordModalProps) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { showSuccess, showError } = useNotification();

  const handleSubmit = async () => {
    if (newPassword !== confirmPassword) {
      showError("New passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      showError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      await axios.post("/api/auth/change-password", {
        currentPassword,
        newPassword,
      });

      showSuccess("Password changed successfully!");
      onPasswordChanged();
    } catch (error: any) {
      showError(error.response?.data?.error || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={true}
      title={
        <Title level={3} className="!mb-0">
          Change Your Password
        </Title>
      }
      onOk={handleSubmit}
      onCancel={onSkip}
      okText="Change Password"
      cancelText="Skip for now"
      confirmLoading={loading}
      maskClosable={false}
      centered
      width={500}
    >
      <div className="py-4">
        <Text className="block mb-6 text-[var(--clr-grey-5)] leading-relaxed">
          For security reasons, please change your password before continuing.
          You can skip this step, but we strongly recommend changing your
          password.
        </Text>

        <div className="flex flex-col gap-4">
          <Input.Password
            size="large"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <Input.Password
            size="large"
            placeholder="New Password (min 6 characters)"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            minLength={6}
          />
          <Input.Password
            size="large"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
      </div>
    </Modal>
  );
}
