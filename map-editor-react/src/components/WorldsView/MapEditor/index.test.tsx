import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';

import { getMockRouterProps } from 'helpers/test/react-router';
import { MapEditor, mapStateToProps, mapDispatchToProps } from './index';
import { worldTypes } from 'services/worlds';
import { defaultStateTree } from 'services/types';
import { mapEditorSelectors, mapEditorActions } from 'services/mapEditor';

Enzyme.configure({ adapter: new Adapter() });

describe("Map Editor", () => {
    let sandbox, wrapper, routerProps, world;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        routerProps = getMockRouterProps<any>(null);
        world = worldTypes.emptyWorldWithBoard;
    });

    afterEach(() => {
        sandbox.restore();
    });

    it ("renders", () => {
        wrapper = shallow(<MapEditor world={world} setActiveWorld={sandbox.spy()} />);
        expect(wrapper).toMatchSnapshot();
    });

    it ("renders an error if there is no world", () => {
        wrapper = shallow(<MapEditor world={null}  setActiveWorld={sandbox.spy()} />);
        expect(wrapper.find("Alert").exists()).toBe(true);
    })

    it ("maps state to props", () => {
        routerProps.match.params = { id: "a"};
        sandbox.stub(mapEditorSelectors, 'getActiveWorldWithBoard').returns(world)

        expect(mapStateToProps(defaultStateTree, routerProps )).toEqual({world});
    })

    it ("handles setting the active world", () => {
        const spy = sandbox.stub(mapEditorActions, 'setActiveWorld');
        const dispatchSpy = sandbox.spy();

        mapDispatchToProps(dispatchSpy).setActiveWorld("a");
        expect(spy.called).toBe(true);

        sandbox.restore();
    })

});
