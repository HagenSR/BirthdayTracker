import { ActionReducer } from '@ngrx/store';

const STORAGE_KEY = 'AkitaStores';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function localStorageMetaReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    const nextState = reducer(state, action);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
    } catch {
      // localStorage unavailable (e.g., private browsing quota exceeded)
    }
    return nextState;
  };
}

export function initializeStateFromStorage(): object | undefined {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : undefined;
  } catch {
    return undefined;
  }
}
