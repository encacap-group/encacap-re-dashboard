import { memo } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Input } from "@components/Form";
import ImageInput from "@components/Form/ImageInput/ImageInput";
import { EstateFormDataType } from "@interfaces/Admin/estateTypes";

import FormGroupTitle from "../../../../../../Common/Components/Form/GroupTitle";

const AdminEstateModificationFormMedia = () => {
  const { t } = useTranslation("admin", {
    keyPrefix: "admin:page.estate.modification.form.media",
  });

  const { control } = useFormContext<EstateFormDataType>();

  return (
    <div className="border-gray-100 pt-6">
      <FormGroupTitle title={t("title")} />
      <div className="mt-5 flex flex-col space-y-6 pt-0.5">
        <Input
          name="youtube"
          control={control}
          className="block"
          label={t("form.youtube.label")}
          placeholder={t("form.youtube.placeholder")}
        />
        <ImageInput
          control={control}
          itemContainerClassName="md:grid-cols-5 xl:grid-cols-7"
          isRequired
          label={t("form.avatar.label")}
          name="avatar"
          placeholder={t("form.avatar.placeholder")}
        />
        <ImageInput
          control={control}
          itemContainerClassName="md:grid-cols-5 xl:grid-cols-7"
          isMultiple
          isRequired
          label={t("form.image.label")}
          name="images"
          placeholder={t("form.image.placeholder")}
        />
      </div>
    </div>
  );
};

export default memo(AdminEstateModificationFormMedia);
