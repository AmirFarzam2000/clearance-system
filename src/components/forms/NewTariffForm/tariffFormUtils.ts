import type { TarrifL2 } from '../../../types/dto/tarrifs.dto';

export interface TariffFormData {
  tariffLevel1: string;
  tariffLevel2: string;
  countingUnit1: string;
  countingUnit2: string;
  countingUnit3: string;
  customsDuties: string;
  commercialProfit: string;
  tariffNumber: string;
  productType: string;
  preferentialCountryCode: string;
  notes: string;
  description: string;
  displayStatus: boolean;
  uniqueCodeSubject: boolean;
}

export const buildPayload = (
  data: TariffFormData,
  selectedL2: TarrifL2 | undefined,
  countingUnits: any[] = []
): any => {
  // Find counting unit titles by ID
  const getCountingUnitTitle = (unitId: string) => {
    if (!unitId) return '';
    const unit = countingUnits.find(u => u.CountingUnitID?.toString() === unitId);
    return unit ? unit.FaTitle : '';
  };

  return {
    TarrifL3ID: null,
    ParentID: selectedL2?.TarrifL2ID || 0,
    TarrifNo: data.tariffNumber || '',
    ProductType: data.productType || '',
    CustomDuty: parseFloat(data.customsDuties) || 0,
    CommercialBenefit: parseFloat(data.commercialProfit) || 0,
    FirstCountingUnitID: data.countingUnit1 ? parseInt(data.countingUnit1) : null,
    FirstCountingUnitTitle: getCountingUnitTitle(data.countingUnit1),
    SecondCountingUnitID: data.countingUnit2 ? parseInt(data.countingUnit2) : null,
    SecondCountingUnitTitle: getCountingUnitTitle(data.countingUnit2),
    ThirdCountingUnitID: data.countingUnit3 ? parseInt(data.countingUnit3) : null,
    ThirdCountingUnitTitle: getCountingUnitTitle(data.countingUnit3),
    PreferentialTarrifCountryCode: data.preferentialCountryCode || '',
    Remark: data.notes || '',
    Description: data.description || '',
    RowVersion: '',
    TitleofParent: selectedL2?.ProductType || '',
    NoofParent: selectedL2?.WithParentNo || '',
    WithParentNo: data.tariffNumber || '',
    isVisible: data.displayStatus,
    NeedtoUniqueCode: data.uniqueCodeSubject
  };
};

export const mapValidationErrors = (
  errors: any[],
  setError: (name: string, error: { type: string; message: string }) => void
): void => {
  const fieldMap: { [key: string]: string } = {
    'ParentID': 'tariffLevel2',
    'TarrifNo': 'tariffNumber',
    'ProductType': 'productType',
    'CustomDuty': 'customsDuties',
    'CommercialBenefit': 'commercialProfit',
    'FirstCountingUnitID': 'countingUnit1',
    'SecondCountingUnitID': 'countingUnit2',
    'ThirdCountingUnitID': 'countingUnit3',
    'PreferentialTarrifCountryCode': 'preferentialCountryCode',
    'Remark': 'notes',
    'Description': 'description',
    'IsVisible': 'displayStatus',
    'NeedtoUniqueCode': 'uniqueCodeSubject'
  };

  errors.forEach((validationError: any) => {
    const propertyName = validationError.PropertyName || '';
    
    let fieldKey: string = propertyName;
    if (!propertyName) {
      if (validationError.ErrorMessage?.includes('واحد شمارشی سوم')) {
        fieldKey = 'ThirdCountingUnitID';
      } else {
        return;
      }
    }

    const field = fieldMap[fieldKey];
    if (field && validationError.ErrorMessage) {
      setError(field, {
        type: 'manual',
        message: validationError.ErrorMessage
      });
    }
  });
};
