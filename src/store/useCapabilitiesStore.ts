import { create } from 'zustand';

interface AppState {
    capabilities: any;
    setCapabilities: (capabilities: any) => void;
    formatCapabilities: (capabilities: any) => any;
}

const useCapabilitiesStore = create<AppState>((set) => ({
    capabilities: null,
    setCapabilities: (capabilities) => set({ capabilities }),
    formatCapabilities: (capabilities) => {
        if (!capabilities || !capabilities.servers) {
            return capabilities;
        }

        return capabilities.servers.reduce((acc: any, server: any) => {
            const { Region } = server;
            if (!acc[Region]) {
                acc[Region] = [];
            }
            acc[Region].push(server);
            return acc;
        }, {});
    }
}));

export default useCapabilitiesStore;