import { IUnitPrice, UNIT_PRICE_TYPE_ENUM } from "@encacap-group/common/dist/re";
import { memo, useCallback, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Input } from "@components/Form";
import { EstateFormDataType } from "@interfaces/Admin/estateTypes";
import { unitPriceService } from "@services/index";

const AdminEstateModificationFormGeneralAreaInputGroup = () => {
  const { t } = useTranslation("admin", {
    keyPrefix: "admin:page.estate.modification.form.general.form",
  });

  const [unitPriceOptions, setUnitPriceOptions] = useState<IUnitPrice[]>([]);

  const { control, register, setValue } = useFormContext<EstateFormDataType>();

  const getUnitPriceOptions = useCallback(() => {
    unitPriceService
      .getUnitPrices({
        type: UNIT_PRICE_TYPE_ENUM.AREA,
      })
      .then(({ data }) => {
        setUnitPriceOptions(data);
        setValue("areaUnitId", data[0].id);
      })
      .catch(() => {
        setUnitPriceOptions([]);
      });
  }, [setValue]);

  useEffect(() => {
    getUnitPriceOptions();
  }, [getUnitPriceOptions]);

  return (
    <div className="relative">
      <Input
        className="block pr-8"
        control={control}
        isRequired
        label={t("area.label")}
        name="area"
        placeholder={t("area.placeholder")}
        type="number"
      />
      <select
        className="absolute right-3.5 top-6 h-10 w-fit cursor-pointer rounded-r-md px-1 outline-none"
        // @ts-ignore: due to react-hook-form issue with self-ref interface.
        {...register("areaUnitId")}
      >
        {unitPriceOptions.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default memo(AdminEstateModificationFormGeneralAreaInputGroup);
