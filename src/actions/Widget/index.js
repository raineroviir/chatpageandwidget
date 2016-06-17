const CHANGE_SELECTED_TAB = 'CHANGE_SELECTED_TAB';

function changeSelectedTab(selectedTab, tabNamespace) {
    return {
        type: CHANGE_SELECTED_TAB,
        tab: selectedTab,
        namespace: tabNamespace
    };
}