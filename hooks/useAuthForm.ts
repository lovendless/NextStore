import { create } from "zustand";

interface useAuthForm {
   isLoading: boolean | undefined,
   isErr: boolean,
   errMsg: String,
   startLoading: () => void,
   endLoading: () => void,
   setErrMsg: (err: String) => void,
}

export const useAuthForm = create<useAuthForm>((set) => ({
   isLoading: false,
   isErr: false,
   errMsg: "",
   startLoading: () => set({isLoading: true}),
   endLoading: () => set({isLoading: false}),
   setErrMsg: (err: String) => set({errMsg: err}),
}))