import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Select } from "@components/Form";
import { HookFormControl } from "@interfaces/Common/commonTypes";
import { SelectOptionItemType } from "@interfaces/Common/elementTypes";
import { locationService } from "@services/index";

interface AdminLocationDistrictModificationDistrictSelectorProps {
  control: HookFormControl;
  disabled?: boolean;
  provinceCode: string | null;
}

const AdminLocationDistrictModificationDistrictSelector = ({
  control,
  disabled,
  provinceCode,
}: AdminLocationDistrictModificationDistrictSelectorProps) => {
  const { t } = useTranslation(["admin"], {
    keyPrefix: "admin:page.location.district.modal.modification",
  });

  const [locationProvinceOptions, setLocationProvinceOptions] = useState<SelectOptionItemType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getDistricts = useCallback(() => {
    if (locationProvinceOptions.length === 0) {
      setIsLoading(true);
    }

    if (!provinceCode) {
      return;
    }

    locationService
      .getGHNDistricts(provinceCode)
      .then((data) => {
        setLocationProvinceOptions(
          data.map((item) => ({
            value: Number(item.ghnRefId),
            label: String(item.name),
          })),
        );
        setIsLoading(false);
      })
      .catch(() => {
        setLocationProvinceOptions([]);
      });
  }, [locationProvinceOptions, provinceCode]);

  useEffect(() => {
    getDistricts();
  }, [getDistricts]);

  return (
    <Select
      name="ghnRefId"
      label={t("form.id.label")}
      placeholder={t("form.id.placeholder")}
      className="block"
      options={locationProvinceOptions}
      isRequired
      control={control}
      disabled={(isLoading || disabled) ?? !provinceCode}
    />
  );
};

export default AdminLocationDistrictModificationDistrictSelector;
