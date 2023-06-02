import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { PostFormDataType } from "@interfaces/Admin/postTypes";

import Editor from "@components/Form/Editor/Editor";
import FormGroupTitle from "@components/Form/GroupTitle";
import ImageInput from "@components/Form/ImageInput/ImageInput";

const AdminPostModificationFormDetail = () => {
  const { t } = useTranslation();

  const { control } = useFormContext<PostFormDataType>();

  return (
    <div>
      <FormGroupTitle title={t("detailInfo")} />
      <div className="mt-5 grid gap-y-6 pt-0.5">
        <ImageInput
          className="md:grid-cols-5 xl:grid-cols-7"
          control={control}
          isRequired
          label={t("avatar")}
          name="avatar"
        />
        <Editor label={t("content")} control={control} name="content" isRequired />
      </div>
    </div>
  );
};

export default AdminPostModificationFormDetail;