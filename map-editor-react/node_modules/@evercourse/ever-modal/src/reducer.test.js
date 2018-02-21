import modalReducer, { defaultState } from './reducer';

describe("Reducers/modal", () => {
    it ("renders the initial state", () => {
        expect(modalReducer(undefined, {})).toEqual(defaultState);
    });

    it("handles showing the modal", () => {
        const modalAction = {
            modalType: "a",
            modalProps: {a: 1}
        };

        const modalState = {
            [modalAction.modalType]: {
                visible: true,
                modalProps: modalAction.modalProps
            }
        };

        expect(modalReducer({}, {type: "modal/SHOW", ...modalAction}))
            .toEqual(modalState);
    });

    it ("handles hiding modal", () => {
        expect(modalReducer({}, {type: "modal/HIDE"}))
            .toEqual(defaultState);
    })

    it ("handles hiding a specific modal", () => {
        expect(modalReducer({sup: {visible: true}}, {type: "modal/HIDE", modalType: "sup"}))
            .toEqual({sup: {visible: false}});
    })
});
