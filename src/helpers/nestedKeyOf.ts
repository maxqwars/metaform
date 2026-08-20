export type NestedKeyOf<T> = T extends object
  ? {
      [K in keyof T & (string | number)]: NonNullable<T[K]> extends object
        ? NonNullable<T[K]> extends readonly unknown[]
          ? `${K}`
          : `${K}` | `${K}.${NestedKeyOf<NonNullable<T[K]>>}`
        : `${K}`
    }[keyof T & (string | number)]
  : never
