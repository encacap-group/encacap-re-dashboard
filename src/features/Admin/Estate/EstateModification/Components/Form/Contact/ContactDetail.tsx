import { IContact, IMAGE_VARIANT_ENUM, getImageURL } from "@encacap-group/common/dist/re";
import { useTranslation } from "react-i18next";

import { Button } from "@components/Form";

interface AdminEstateModificationFormContactDetailProps {
  data: IContact;
  onClickChange: () => void;
}

const AdminEstateModificationFormContactDetail = ({
  data,
  onClickChange,
}: AdminEstateModificationFormContactDetailProps) => {
  const { t } = useTranslation("admin", {
    keyPrefix: "admin:page.estate.modification.form.contact",
  });

  return (
    <>
      <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-full bg-gray-50">
        <img
          src={getImageURL(data.avatar, IMAGE_VARIANT_ENUM.SMALL)}
          alt="avatar"
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="flex-1">
        <div className="font-semibold">{data.name}</div>
        <div className="mt-0.5 flex items-center space-x-2 text-sm">
          <div>
            {t("phone")}: {data.phone}
          </div>
          <div>-</div>
          <div>
            {t("zalo")}: {data.zalo}
          </div>
          {data.email && (
            <>
              <div>-</div>
              <div>
                {t("email")}: {data.email}
              </div>
            </>
          )}
        </div>
      </div>
      <Button size="xs" color="primary-light" className="px-4" onClick={onClickChange}>
        {t("change")}
      </Button>
    </>
  );
};

export default AdminEstateModificationFormContactDetail;
