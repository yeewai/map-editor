import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';

import { getMockRouterProps } from 'helpers/test/react-router';
import { DrawMap, mapStateToProps } from './DrawMap';
import { worldTypes } from 'services/worlds';

Enzyme.configure({ adapter: new Adapter() });

describe("Drawing the Map", () => {
    let sandbox, wrapper, routerProps;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        routerProps = getMockRouterProps<any>(null);
    });

    afterEach(() => {
        sandbox.restore();
    });

    it ("renders", () => {
        const world = {
            uniqueStructures: [
                {
                    ...worldTypes.emptyStructure,
                    id: "a",
                    imageWidth: 1,
                    imageHeight: 2,
                    image: {
                        innerHTML: "Sup"
                    }
                }
            ]
        }

        wrapper = shallow(<DrawMap world={world} zoom={1} pan={ {h: 1, v: 1} } />);
        expect(wrapper).toMatchSnapshot();
    });


    it ("maps state to props", () => {
        const props = mapStateToProps({mapEditor: { zoom: 1, panH: 2, panV: 3}} )

        expect(props.zoom).toEqual(1);
        expect(props.pan).toEqual({h: 2, v: 3});
    })

});
