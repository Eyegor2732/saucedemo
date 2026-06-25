import { SortOption } from '@data/types/sortOptionTypes';

export type InventorySortingData = {
  testcase: string;
  title: string;
  select: SortOption;
  isNameSort: boolean;
  isAscending: boolean;
  isMappingTest: boolean;
};

export const InventorySortingSet: InventorySortingData[] = [
  {
    testcase: 'TC-PRODUCT-02',
    title: 'sorting by name A to Z',
    select: 'az',
    isNameSort: true,
    isAscending: true,
    isMappingTest: false,
  },
  {
    testcase: 'TC-PRODUCT-03',
    title: 'sorting by name Z to A',
    select: 'za',
    isNameSort: true,
    isAscending: false,
    isMappingTest: false,
  },
  {
    testcase: 'TC-PRODUCT-04',
    title: 'sorting by price low to high',
    select: 'lohi',
    isNameSort: false,
    isAscending: true,
    isMappingTest: false,
  },
  {
    testcase: 'TC-PRODUCT-05',
    title: 'sorting by price high to low',
    select: 'hilo',
    isNameSort: false,
    isAscending: false,
    isMappingTest: false,
  },
  {
    testcase: 'TC-PRODUCT-07',
    title: 'sorting by name A to Z',
    select: 'az',
    isNameSort: true,
    isAscending: true,
    isMappingTest: true,
  },
  {
    testcase: 'TC-PRODUCT-08',
    title: 'sorting by name Z to A',
    select: 'za',
    isNameSort: true,
    isAscending: false,
    isMappingTest: true,
  },
  {
    testcase: 'TC-PRODUCT-09',
    title: 'sorting by price low to high',
    select: 'lohi',
    isNameSort: false,
    isAscending: true,
    isMappingTest: true,
  },
  {
    testcase: 'TC-PRODUCT-10',
    title: 'sorting by price high to low',
    select: 'hilo',
    isNameSort: false,
    isAscending: false,
    isMappingTest: true,
  },
];