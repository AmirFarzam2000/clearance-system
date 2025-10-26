export interface TarrifL3 {
  TarrifL3ID: number;
  ParentID: number;
  TarrifNo: string;
  ProductType: string;
  CustomDuty: number;
  CommercialBenefit: number;
  FirstCountingUnitID: number;
  FirstCountingUnitTitle: string;
  SecondCountingUnitID: number | null;
  SecondCountingUnitTitle: string;
  ThirdCountingUnitID: number | null;
  ThirdCountingUnitTitle: string;
  PreferentialTarrifCountryCode: string;
  Remark: string;
  Description: string;
  RowVersion: string;
  TitleofParent: string;
  NoofParent: string;
  WithParentNo: string;
  isVisible: boolean;
  NeedtoUniqueCode: boolean;
}

export interface TarrifL2 {
  TarrifL2ID: number;
  ParentID: number;
  TarrifNo: string;
  ProductType: string;
  PreferentialTarrifCountryCode: string;
  Remark: string;
  Description: string;
  RowVersion: string;
  TitleodParent: string;
  NoofParent: string;
  WithParentNo: string;
  Childs: TarrifL3[];
  isVisible: boolean;
}

export interface TarrifL1 {
  TarrifL1ID: number;
  TarrifNo: number;
  ProductType: string;
  PreferentialTarrifCountryCode: string;
  Remark: string;
  Description: string;
  isVisible: boolean;
  RowVersion: string;
  Childs: TarrifL2[];
}