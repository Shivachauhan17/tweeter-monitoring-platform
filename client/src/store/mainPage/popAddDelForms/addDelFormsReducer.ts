export interface AddDelState{
    popAddUser:boolean,
    popDelUser:boolean,
    popAddKeyword:boolean,
    popDelKeyword:boolean
};

const initialState:AddDelState={
    popAddUser:false,
    popDelUser:false,
    popAddKeyword:false,
    popDelKeyword:false
};

export interface AddDelAction{
    type:string
};

const addDelReducer=(state:AddDelState=initialState,action:AddDelAction):AddDelState=>{
    
    switch(action.type){
        case 'addDelForm/popAddUser':
            return{
                ...state,
                popAddUser:!state.popAddUser
            }

        case 'addDelForm/popDelUser':
            return{
                ...state,
                popDelUser:!state.popDelUser
            }

        case 'addDelForm/popAddKeyword':
            return{
                ...state,
                popAddKeyword:!state.popAddKeyword
            }

        case 'addDelForm/popDelKeyword':
            return{
                ...state,
                popDelKeyword:!state.popDelKeyword
            }

        default:
            return state
    }
};

export default addDelReducer;