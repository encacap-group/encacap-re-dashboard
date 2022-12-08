import { omit } from 'lodash';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { AxiosErrorType } from '@interfaces/Common/commonTypes';
import { adminCategoryService } from '@services/index';

import { ConfirmationModal } from '@components/Modal';
import { ConfirmationModalProps } from '@components/Modal/ConfirmationModal';

import AdminCategoryDeleteConfirmationModalContent from './AdminCategoryDeleteConfirmationModalContent';

interface AdminCategoryDeleteConfirmationModalProps
  extends Omit<ConfirmationModalProps, 'title' | 'message' | 'onConfirm'> {
  categoryCode?: string;
  onDeleted?: () => void;
  onDeleteFailed?: (error: AxiosErrorType) => void;
}

const AdminCategoryDeleteConfirmationModal = ({
  isOpen,
  categoryCode,
  onDeleted,
  onDeleteFailed,
  onClose,
  ...props
}: AdminCategoryDeleteConfirmationModalProps) => {
  const { t } = useTranslation('admin', {
    keyPrefix: 'admin:page.category.modal.delete',
  });

  const handleConfirmDeleteCategory = useCallback(() => {
    if (!categoryCode) {
      return;
    }

    adminCategoryService
      .deleteCategoryByCode(categoryCode)
      .then(() => {
        onDeleted?.();
      })
      .catch(onDeleteFailed)
      .finally(() => {
        onClose?.();
      });
  }, [categoryCode, onClose, onDeleted, onDeleteFailed]);

  return (
    <ConfirmationModal
      isOpen={isOpen}
      status="danger"
      title={t('title')}
      message={<AdminCategoryDeleteConfirmationModalContent />}
      onConfirm={handleConfirmDeleteCategory}
      onClose={onClose}
      {...omit(props, 'title', 'message', 'onConfirm')}
    />
  );
};

export default AdminCategoryDeleteConfirmationModal;
