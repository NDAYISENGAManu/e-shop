"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import ChangePasswordModal from "./ChangePasswordModal";
import { useRouter } from "next/navigation";

export default function PasswordChangeWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, update } = useSession();
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (session?.user && (session.user as any).mustChangePassword) {
      setShowModal(true);
    }
  }, [session]);

  const handlePasswordChanged = async () => {
    setShowModal(false);
    // Update the session to reflect the password change
    await update();
    router.refresh();
  };

  const handleSkip = async () => {
    setShowModal(false);
  };

  return (
    <>
      {children}
      {showModal && (
        <ChangePasswordModal
          onPasswordChanged={handlePasswordChanged}
          onSkip={handleSkip}
        />
      )}
    </>
  );
}
