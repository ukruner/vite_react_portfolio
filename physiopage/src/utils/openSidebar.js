import mainStore from "../store";
import { switcherActions } from "../store/slices/switchers";

export default function openSidebar() {
        mainStore.dispatch(switcherActions.setIsSidebarOpen())
    }