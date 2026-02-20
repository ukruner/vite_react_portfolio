import mainStore from "../store";
import { switcherActions } from "../store/slices/switchers";

export default function openSidebar(payload) {
        mainStore.dispatch(switcherActions.setIsSidebarOpen(payload));
    }