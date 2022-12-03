import { FormImageInputDataType } from '@interfaces/Common/elementTypes';
import { ImageDataType } from '@interfaces/Common/imageTypes';

export interface CategoryDataType {
  code: string;
  name: string;
  categoryGroupCode: string;
  thumbnail: ImageDataType;
}

export interface CategoryFormDataType {
  name: string;
  categoryGroupCode: string;
  thumbnail: FormImageInputDataType;
}
