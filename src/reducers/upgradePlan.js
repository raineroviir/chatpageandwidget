const initialState = {
    activePlanTab: 'year',    
    plans: {
        month: [],
        year: []
    },
    choosedPlan:{},
    memberCount: 2,
    requestStatus: '',
    source: {
        from : '/dashboard',
        label: 'Dashboard'
    }
};

export function upgradePlan(state = initialState, action) {

    switch (action.type) {
        case 'UPGRADE_PLAN_UPDATE_STATE': 
        return {
            ...state,
            ...action.newState
        }
        
        /*case 'UPDATE_UPGRADE_PLAN_SOURCE': {
            return {
                ...state,
                ...action.source
            };
        }*/

      default: return state;
    }
}