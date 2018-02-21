import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';

import { DrawBoard, mapDispatchToProps } from './DrawBoard';
import { mapEditorActions } from 'services/mapEditor';

Enzyme.configure({ adapter: new Adapter() });

describe("Drawing the board", () => {
    let sandbox, wrapper, board;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        board = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
        ]
    });

    afterEach(() => {
        sandbox.restore();
    });

    it ("renders", () => {

        wrapper = shallow(<DrawBoard board={board} />);
        expect(wrapper).toMatchSnapshot();
    });

    it ("doesn't rerender if the board hasn't changed (eg adjusting the camera)", () => {
        const wrapper = shallow(<DrawBoard board={board} />)

        expect(wrapper.instance().shouldComponentUpdate({board})).toBe(false)
        expect(wrapper.instance().shouldComponentUpdate({board: [[1]]})).toBe(true)
    })

    it ("handles mouse enter", () => {
        const spy = sandbox.stub(mapEditorActions, 'setMousePosition');
        const dispatchSpy = sandbox.spy();

        mapDispatchToProps(dispatchSpy).onMouseEnter(1,2);
        expect(spy.called).toBeTruthy();

        sandbox.restore();
    })

    it ("handles mouse click", () => {
        const spy = sandbox.stub(mapEditorActions, 'mouseClick');
        const dispatchSpy = sandbox.spy();

        mapDispatchToProps(dispatchSpy).onMouseClick(3,4);
        expect(spy.called).toBeTruthy();

        sandbox.restore();
    })

});
