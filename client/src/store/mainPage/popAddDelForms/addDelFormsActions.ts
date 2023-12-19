import addDelActionTypes from "./addDelFormsActionTYpes";

const addDelActions={
    popAddUser:()=>{
        return{
            type:addDelActionTypes.POP_ADD_USER
        }
    },
    popDelUser:()=>{
        return{
            type:addDelActionTypes.POP_DEL_USER
        }
    },
    popAddKeyword:()=>{
        return{
            type:addDelActionTypes.POP_ADD_KEYWORD
        }
    },
    popDelKeyword:()=>{
        return{
            type:addDelActionTypes.POP_DEL_KEYWORD
        }
    }
}

export default addDelActions;