import { create } from "zustand";

interface ContextState {
  fileName: string | null;
  fileContent: string | null;

  setContext: (
    fileName: string,
    fileContent: string
  ) => void;

  clearContext: () => void;
}

export const useContextStore =
  create<ContextState>((set) => ({
    fileName: null,
    fileContent: null,

    setContext: (
      fileName,
      fileContent
    ) =>
      set({
        fileName,
        fileContent,
      }),

    clearContext: () =>
      set({
        fileName: null,
        fileContent: null,
      }),
  }));