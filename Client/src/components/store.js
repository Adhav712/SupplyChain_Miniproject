import create from 'zustand';
import {devtools } from "zustand/middleware";

let store = (set) => ({
    org: 'Owner',
   Checkauth: (isLoggedIn) => set({ isLoggedIn }),    
    // Checkauth: (isLoggedIn) =>{
    //     set((state) => ({
    //         isLoggedIn: [...state.isLoggedIn, isLoggedIn]
    //     }))
    // },
    


    isLoggedIn: 'false',
    SelectedOrg: (org) => set({ org })
    // SelectedOrg: (org) =>{
    //     set((state) => ({
    //         org: [...state.org, org]
    //     }))
    // }
    //set((state) => ({org: [...state.org, org]})), use this for array
    
})
 
store = devtools(store)    
const useStore = create(store);

export default useStore;