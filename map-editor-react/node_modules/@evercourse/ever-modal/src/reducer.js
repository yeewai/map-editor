export const defaultState = { };

const modalReducer = (state = defaultState, action) => {
    switch(action.type) {
        case 'modal/SHOW':
            return { ...state, [action.modalType]: {visible: true, modalProps: action.modalProps} };
        case 'modal/HIDE':
            // Hide all modals if no type specified
            return action.modalType
                ? { ...state, [action.modalType]: {visible: false} }
                : defaultState
        default:
            return state;
    }
}

export default modalReducer;
