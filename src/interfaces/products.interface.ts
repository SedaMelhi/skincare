export interface IShade {
  ID: string;
  NAME: string;
  PREVIEW_PICTURE: string;
  PREVIEW_TEXT: string;
}

export interface IScu {
  id: number;
  name: string;
  value: string;
  price: {
    basePrice: number;
    discountPrice: number;
    discount: number;
    percent: number;
  };
  photos?: string[];
  quantity: string;
  discount?: string;
  shade?: IShade;
}

export type Color = {
  name: string;
  value: string;
};

export interface IProduct {
  id: string;
  name: string;
  colors: Color[] | null;
  picture: string | null;
  volumes: string[];
  sectionCode: string;
  sectionName: string;
  pins: string[];
  minPrice: number;
  addPhotos?: string[] | null;
  brand?: {
    ID: string;
    NAME: string;
    PREVIEW_PICTURE: string;
    PREVIEW_TEXT: string;
  };
  description?: string;
  detailPhoto?: string | null;
  preDescription?: string;
  props?: any;
  scu?: IScu[];
  quantity?: number;
}

export type IProductArr = IProduct[];
