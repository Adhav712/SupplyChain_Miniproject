import create from 'zustand';

const store = (set) => ({
    org: 'Owner',
    SelectedOrg: (org) => 
    //set((state) => ({org: [...state.org, org]})),         use this for array
    set((state) => ({org: state.org, org})),
})
 
const useStore = create(store);

export default useStore;