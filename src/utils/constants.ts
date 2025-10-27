import type { MenuItem } from '../types/types';

export const BASIC_INFO_ITEMS: MenuItem[] = [
  { id: '1', label: 'تعرفه ها', path: '/dashboard/tarrifs-management' },
  { id: '2', label: 'گروه کالا', path: '/dashboard/productgroups-managment' },
  { id: '3', label: 'واحد اندازه گیری', path: '/dashboard/countingunits-management' },
  { id: '4', label: 'شرکت های خارجی' },
  { id: '5', label: 'اشخاص' },
  { id: '6', label: 'شرکت های داخلی' },
  { id: '7', label: 'گروه های ارزش گذاری' },
  { id: '8', label: 'کالا', path: '/dashboard/products-management' },
  { id: '9', label: 'انبارها' }
];

export const SYSTEM_AFFAIRS_ITEMS: MenuItem[] = [
  { id: '1', label: 'تعریف ارز', path: '/dashboard/currency-definition' },
  { id: '2', label: 'مدیریت ارزها', path: '/dashboard/currency-management' },
  { id: '3', label: 'دسته بندی آرشیو', path: '/dashboard/archive-categorization' }
];

export const PERSONAL_TASKS_ITEMS: MenuItem[] = [
  { id: '1', label: 'وظایف من' },
  { id: '2', label: 'درخواست های من' },
  { id: '3', label: 'گزارشات' }
];
