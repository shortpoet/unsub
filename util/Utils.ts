// Path: util/Utils.ts
export function lazy<T>(fn: () => T): () => T {
  let value: T | undefined;
  return () => {
    if (value === undefined) {
      value = fn();
    }
    return value;
  };
}

export function lazyAsyncCallback<T>(fn: () => Promise<T>): () => Promise<T> {
  let value: T | undefined;
  return async () => {
    if (value === undefined) {
      value = await fn();
    }
    return value;
  };
}

export function lazyCatch(fn: () => Promise<any>, onCatch: (error: any) => void): () => Promise<any> {
  let value: any | undefined;
  onCatch =
    onCatch ||
    (err => {
      console.error(err.message, err);
    });
  return async () => {
    if (value === undefined) {
      try {
        value = await fn();
      } catch (error) {
        onCatch(error);
      }
    }
    return value;
  };
}

export function formatNumberViceVersa(value: number, digits = 0): number | string {
  if (!value) return value;
  if (typeof value === 'string') {
    value = parseFloat(value);
  }
  return parseFloat(value.toFixed(digits)).toLocaleString();
}

export function formatCurrencyViceVersa(value: number, digits = 0): string | number {
  if (!value) return value;
  if (typeof value === 'string') {
    value = parseFloat(value);
  }
  return parseFloat(value.toFixed(digits)).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
  });
}
