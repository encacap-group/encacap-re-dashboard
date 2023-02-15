import { useCallback, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { UNIT_PRICE_TYPE_ENUM } from '@constants/enums';
import { EstateModificationFormDataType } from '@interfaces/Admin/estateTypes';
import { UnitPriceDataType } from '@interfaces/Common/unitPriceTypes';
import { unitPriceService } from '@services/index';

import { Input } from '@components/Form';

const AdminEstateModificationFormGeneralAreaInputGroup = () => {
  const { t } = useTranslation('admin', {
    keyPrefix: 'admin:page.estate.modification.form.general.form',
  });

  const [unitPriceOptions, setUnitPriceOptions] = useState<UnitPriceDataType[]>([]);

  const { control, register } = useFormContext<EstateModificationFormDataType>();

  const getUnitPriceOptions = useCallback(async () => {
    unitPriceService
      .getUnitPrices({
        type: UNIT_PRICE_TYPE_ENUM.AREA,
      })
      .then(({ data }) => {
        setUnitPriceOptions(data);
      })
      .catch(() => {
        setUnitPriceOptions([]);
      });
  }, []);

  useEffect(() => {
    void getUnitPriceOptions();
  }, [getUnitPriceOptions]);

  return (
    <div className="relative">
      <Input
        className="block pr-8"
        control={control}
        isRequired
        label={t('area.label')}
        name="area"
        placeholder={t('area.placeholder')}
        type="number"
      />
      <select
        className="absolute right-3.5 bottom-0.5 h-11 w-fit cursor-pointer rounded-r-md px-1 outline-none"
        {...register('areaUnitId')}
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

export default AdminEstateModificationFormGeneralAreaInputGroup;
