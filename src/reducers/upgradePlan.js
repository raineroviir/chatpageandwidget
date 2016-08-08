const initialState = {
    activePlanTab: 'year',    
    plans: {
        month: [],
        year: []
    },
    choosedPlan:{},
    memberCount: 2
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