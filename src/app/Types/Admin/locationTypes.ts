import { BaseGetListQueryType } from '@interfaces/Common/commonTypes';

export interface LocationProvinceDataType {
  code: string;
  name: string;
  ghnRefId: number;
}

export interface LocationProvinceWebsiteDataType {
  provinceCode: string;
  websiteId: number;
  province: LocationProvinceDataType;
}

export interface LocationProvinceWebsiteFormDataType {
  ghnRefId: number | null;
}

export interface LocationDistrictDataType {
  code: string;
  name: string;
  provinceCode: string;
  ghnRefId: number;
  province: LocationProvinceDataType;
}

export interface LocationDistrictWebsiteDataType {
  districtCode: string;
  websiteId: number;
  district: LocationDistrictDataType;
}

export interface LocationDistrictWebsiteFormDataType {
  ghnRefId: number | null;
  provinceCode: string | null;
}

export interface LocationDistrictGetListQueryType extends BaseGetListQueryType {
  provinceCode?: string;
}

export interface LocationWardDataType {
  code: string;
  name: string;
  districtCode: string;
  ghnRefId: number;
  district: LocationDistrictDataType;
}

export interface LocationWardWebsiteDataType {
  code: string;
  name: string;
  districtCode: string;
  district: LocationDistrictDataType;
}

export interface LocationWardWebsiteFormDataType {
  ghnRefId: number | null;
  districtCode: string | null;
  provinceCode: string | null;
}

export interface LocationWardGetListQueryType extends BaseGetListQueryType {
  districtCode?: string;
}

export interface LocationAddressBookDataType {
  id: number;
  address: string;
  wardCode: string;
  districtCode: string;
  provinceCode: string;
  ward: LocationWardDataType;
  district: LocationDistrictDataType;
  province: LocationProvinceDataType;
  websiteId: number;
  latitude: number | null;
  longitude: number | null;
}
