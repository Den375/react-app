import {getAuthUserData} from "./auth-reducer";

const INITIALIZED_SUCCESS = 'social-network/app/INITIALIZED_SUCCESS';

type InitialStateType = {
    initialized: boolean
}

const initialState: InitialStateType = {
    initialized: false
};

const appReducer = (state = initialState, action: any):InitialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true,
            }

        default:
            return state
    }
}

export type InitializedSuccessType = {
    type: typeof INITIALIZED_SUCCESS
}

const initializedSuccess = ():InitializedSuccessType => ({type: INITIALIZED_SUCCESS});

export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getAuthUserData())
    //dispatch(somethingElse());
    //dispatch(somethingElse());
    Promise.all([promise])
        .then(() => {
            dispatch(initializedSuccess());
        });
}

export default appReducer;