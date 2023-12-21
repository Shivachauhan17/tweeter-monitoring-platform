export interface MyMUser{
    profile:string,
    person:string
};


export interface AllM{
    allUsers:MyMUser[]
};

export interface AllMAction{
    type:string,
    payload:MyMUser[]
};

const initialState:AllM={
    allUsers:[]
};



const allMReducer=(state:AllM=initialState,action:AllMAction):AllM=>{
    switch(action.type){

        case 'allM/setAllUsers':
            return{
                ...state,
                allUsers:action.payload
            }
        default:
            return state

    }
}

export default allMReducer;
