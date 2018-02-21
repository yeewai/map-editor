import * as actions from './actions'

describe('Modal Actions', () => {
    it('should create an action to show modal', () => {
        const props = {a: 1}
        const expectedAction = {
            type: 'modal/SHOW',
            modalType: 'a',
            modalProps: props
        }
        expect(actions.showModal('a', props)).toEqual(expectedAction)
    })

    it('should create an action to hide modal', () => {
        const expectedAction = {
            type: 'modal/HIDE'
        }
        expect(actions.hideModal()).toEqual(expectedAction)
    })
})
