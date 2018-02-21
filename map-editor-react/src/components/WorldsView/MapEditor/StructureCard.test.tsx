import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';

import { getMockRouterProps } from 'helpers/test/react-router';
import { StructureCard, mapStateToProps, mapDispatchToProps } from './StructureCard';
// import { worldTypes } from 'services/worlds';
import { defaultStateTree } from 'services/types';
import { mapEditorSelectors, mapEditorActions } from 'services/mapEditor';

Enzyme.configure({ adapter: new Adapter() });

describe("Map Editor", () => {
    let sandbox, wrapper, routerProps, world;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        routerProps = getMockRouterProps<any>(null);
        // world = worldTypes.emptyWorldWithBoard;
    });

    afterEach(() => {
        sandbox.restore();
    });

    it ("renders", () => {
        wrapper = shallow(<StructureCard structureDefinition={{name: "a", width: 1, length: 2, description: "<p>Sup</p>"}} isActive={true} setBuildStructureDefinition={sandbox.spy()} />);
        expect(wrapper).toMatchSnapshot();
    });

    it ("renders an inactive structure definition", () => {
        wrapper = shallow(<StructureCard structureDefinition={{name: "a", width: 1, length: 2}} isActive={false} setBuildStructureDefinition={sandbox.spy()} />);
        expect(wrapper).toMatchSnapshot();
    });

    it ("calls setBuildStructureDefinition on click", () => {
        const spy = sandbox.spy();
        const wrapper = shallow(<StructureCard structureDefinition={} isActive={false} setBuildStructureDefinition={spy()} />);
        wrapper.simulate("click");

        expect(spy.called).toBeTruthy();
    })


    it ("maps state to props", () => {
        const ownProps = { structureDefinition: "a"};
        sandbox.stub(mapEditorSelectors, 'getBuildStructureDefinition').returns("a")

        expect(mapStateToProps(defaultStateTree, ownProps )).toBeTruthy()
    })

    it ("handles setting the build structure", () => {
        const spy = sandbox.stub(mapEditorActions, 'setStructureDefinition');
        const dispatchSpy = sandbox.spy();

        mapDispatchToProps(dispatchSpy).setBuildStructureDefinition("a");
        expect(spy.called).toBe(true);

        sandbox.restore();
    })

});
