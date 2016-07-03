const initialState = {
    activePlanTab: 'annual',
    currentPlan: 'free',
    plans: [],
    choosedPlan:{}
};

export function upgradePlan(state = initialState, action) {

    switch (action.type) {
        case 'UPGRADE_PLAN_UPDATE_KEY': 
        return {
            ...state,
            ...action.newState
        }
        

      default: return state;
    }
}