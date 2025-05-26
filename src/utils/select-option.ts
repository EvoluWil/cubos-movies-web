export const formatSelectOption = <T>(
  array: T[],
  valueKey: keyof T,
  labelKey: keyof T,
) => {
  return array.map((item) => ({
    label: item[labelKey],
    value: item[valueKey],
  }));
};
