import { omit } from "lodash";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

import { ConfirmationModal } from "@components/Modal";
import { ConfirmationModalProps } from "@components/Modal/ConfirmationModal";
import useToast from "@hooks/useToast";
import { adminLocationService } from "@services/index";

import AdminLocationProvinceDeleteConfirmationModalContent from "./AdminLocationProvinceDeleteConfirmationModalContent";

interface AdminLocationProvinceDeleteConfirmationModalProps
  extends Omit<ConfirmationModalProps, "title" | "message" | "onConfirm"> {
  code: string;
  onDeleted: () => void;
  onDeleteFailed?: () => void;
}

const AdminLocationProvinceDeleteConfirmationModal = ({
  isOpen,
  code: provinceCode,
  onDeleted,
  onClose,
  onDeleteFailed,
  ...props
}: AdminLocationProvinceDeleteConfirmationModalProps) => {
  const { t } = useTranslation(["admin"], {
    keyPrefix: "admin:page.location.province",
  });

  const toast = useToast();

  const handleDeleteContact = useCallback(() => {
    if (!provinceCode) return;

    adminLocationService
      .deleteProvinceByCode(provinceCode)
      .then(() => {
        onDeleted();
        toast.success(t("notification.delete.provinceDeleted"));
      })
      .catch(() => {
        onDeleteFailed?.();
        toast.error(t("notification.delete.provinceDeleteFailed"));
      })
      .finally(() => {
        onClose();
      });
  }, [onClose, onDeleteFailed, onDeleted, provinceCode, t, toast]);

  return (
    <ConfirmationModal
      isOpen={isOpen}
      status="danger"
      title={t("modal.delete.title")}
      message={<AdminLocationProvinceDeleteConfirmationModalContent />}
      onConfirm={handleDeleteContact}
      onClose={onClose}
      {...omit(props, "title", "message")}
    />
  );
};

export default AdminLocationProvinceDeleteConfirmationModal;
