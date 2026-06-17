export type InventorySortingData = {
  testcase: string;
  title: string;
  select: string;
  isNameSort: boolean;
};

export const InventorySortingSet: InventorySortingData[] = [
  {
    testcase: 'TC-PRODUCT-02',
    title: 'sorting by name A to Z',
    select: 'az',
    isNameSort: true,
  },
  {
    testcase: 'TC-PRODUCT-03',
    title: 'sorting by name Z to A',
    select: 'za',
    isNameSort: true,
  },
  {
    testcase: 'TC-PRODUCT-04',
    title: 'sorting by price low to high',
    select: 'lohi',
    isNameSort: false,
  },
  {
    testcase: 'TC-PRODUCT-05',
    title: 'sorting by price high to low',
    select: 'hilo',
    isNameSort: false,
  },
];