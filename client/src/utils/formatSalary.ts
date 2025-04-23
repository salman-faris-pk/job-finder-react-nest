export const formatSalary = (
  salary: number | string | null | undefined
): string => {

  if (salary === null || salary === undefined) {
    return 'Salary not disclosed';
  }

  const numericSalary = typeof salary === 'string' 
    ? parseFloat(salary) 
    : salary;

  if (isNaN(numericSalary)) {
    return 'Invalid salary';
  }

  const formatted = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  }).format(numericSalary);

  return numericSalary < 50000 
    ? `${formatted} (negotiable)` 
    : formatted;
};