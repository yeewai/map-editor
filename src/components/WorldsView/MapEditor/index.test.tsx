import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';

import { getMockRouterProps } from 'helpers/test/react-router';
import { MapEditor, mapStateToProps } from './index';
import { worldSelectors, worldTypes } from 'services/worlds';
import { defaultStateTree } from 'services/types';

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
        wrapper = shallow(<MapEditor world={world} />);
        expect(wrapper).toMatchSnapshot();
    });

    it ("renders an error if there is no world", () => {
        wrapper = shallow(<MapEditor world={null} />);
        expect(wrapper.find("Alert").exists()).toBe(true);
    })

    it ("maps state to props", () => {
        routerProps.match.params = { id: "a"};
        sandbox.stub(worldSelectors, 'getWorldWithBoardByKey').returns(world)

        expect(mapStateToProps(defaultStateTree, routerProps )).toEqual({world});
    })

});
