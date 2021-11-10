import { navigationRef } from "./RootNavigation";

export function getFullPath(route) {
    switch (route) {
        case "ContactStackScreen":
            return navigationRef.current?.navigate("ContactStackScreen");
        default:
            return;
    }
}