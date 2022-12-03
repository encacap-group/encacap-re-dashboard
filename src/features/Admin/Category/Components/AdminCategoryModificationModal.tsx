import { yupResolver } from '@hookform/resolvers/yup';
import { omit } from 'lodash';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { CategoryDataType, CategoryFormDataType } from '@interfaces/Admin/categoryTypes';

import { Button, Input } from '@components/Form';
import ImageInput from '@components/Form/ImageInput/ImageInput';
import Modal, { ModalProps } from '@components/Modal/Modal';

import { generateImageFormData } from '@utils/image';

import { categoryFormSchema } from '../Schemas/categoryFormSchema';
import AdminCategoryGroupSelector from './AdminCategoryGroupSelector';

interface AdminCategoryModificationModalProps extends ModalProps {
  category: CategoryDataType | null;
}

const AdminCategoryModificationModal = ({
  category,
  onClose,
  ...props
}: AdminCategoryModificationModalProps) => {
  const { t } = useTranslation('admin', {
    keyPrefix: 'admin:pages.category.modal.modification',
  });

  const defaultValues = {
    name: '',
    categoryGroupCode: '',
    thumbnail: null,
  };

  const {
    control,
    handleSubmit: useFormSubmit,
    reset,
    setValue,
  } = useForm<CategoryFormDataType>({
    resolver: yupResolver(categoryFormSchema(t)),
    defaultValues,
  });

  const handleSubmit = useFormSubmit((data) => {
    console.log(data);
  });

  const handleClose = useCallback(() => {
    reset();
    onClose();
  }, [onClose, reset]);

  useEffect(() => {
    if (category !== null) {
      setValue('name', category.name);
      setValue('categoryGroupCode', category.categoryGroupCode);
      setValue('thumbnail', generateImageFormData(category.thumbnail));
    }
  }, [category]);

  return (
    <Modal
      title={category ? t('title.edit') : t('title.create')}
      onConfirm={handleSubmit}
      onClose={handleClose}
      {...omit(props, 'onSubmit')}
    >
      <form className="grid gap-6" onSubmit={handleSubmit}>
        <Input
          name="name"
          label={t('form.name.label')}
          placeholder={t('form.name.placeholder')}
          className="block"
          control={control}
        />
        <AdminCategoryGroupSelector control={control} />
        <ImageInput name="thumbnail" label={t('form.thumbnail.label')} control={control} />
        <Button type="submit" className="hidden" />
      </form>
    </Modal>
  );
};

export default AdminCategoryModificationModal;
