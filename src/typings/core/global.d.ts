type Nullable<T> = T | null;

type Binary = 0 | 1;

type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
