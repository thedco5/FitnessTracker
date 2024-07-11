// src/globals.ts
export let globalToken: string | null = null;

export const setGlobalToken = (token: string | null) => {
  globalToken = token;
};
