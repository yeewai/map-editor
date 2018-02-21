import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import * as actions from "./actions";
import sinon from 'sinon';
import $ from 'jquery';

import api from 'api';

const mockStore = configureMockStore([thunk]);

describe("Actions/structureDefinitions", () => {
    let sandbox, store;

    beforeEach( () => {
        sandbox = sinon.createSandbox();
        store = mockStore({});
    })

    afterEach(() => {
        sandbox.restore();
    })

    it('creates a success when fetching structures has been done', () => {
        // const scope = nock('http://localhost:8080').log(console.log)
        //     .get('/structureDefinitions')
        //     .reply(200, { payload: [1,2,3] });
        //
        let stub = sandbox.stub($, 'ajax').callsFake( () => (
            new Promise(function(resolve, reject) {
                resolve( [1,2,3] );
            })
        ));

        const expectedActions = [
            { type: 'structureDefinition/REQUEST' },
            { type: 'structureDefinition/RECEIVE', payload: [1,2,3]  }
        ];

        return store.dispatch(actions.fetchStructureDefinitions()).then(() => {
            const gotActions = store.getActions();
            expect(gotActions[0]).toEqual(expectedActions[0]);
            expect(gotActions[1]).toEqual(expectedActions[1]);
        });
    });

    it ('creates a fail when fetching program fails', () => {
        // nock("http://localhost")
        //     .get('/structureDefinitions')
        //     .replyWithError("");
        let stub = sandbox.stub($, 'ajax').callsFake( () => (
            new Promise(function(resolve, reject) {
                reject();
            })
        ));
        const store = mockStore({});

        return store.dispatch(actions.fetchStructureDefinitions()).then(() => {
            expect(store.getActions()[1]).toMatchObject({  "type": "structureDefinition/SET_ERROR" });
        });

    });

    it('makes an update structure definition api call', () => {
        // const scope = nock('http://localhost:8080').log(console.log)
        //     .get('/structureDefinitions')
        //     .reply(200, { payload: [1,2,3] });
        //
        let stub = sandbox.stub($, 'ajax').callsFake( () => (
            new Promise(function(resolve, reject) {
                resolve( [1,2,3] );
            })
        ));

        const expectedActions = [
            { type: 'structureDefinition/PUT' },
            { type: "modal/HIDE", modalType: undefined},
            { type: 'structureDefinition/REQUEST' },
            { type: 'structureDefinition/RECEIVE', payload: [1,2,3]  }
        ];

        return store.dispatch(actions.updateStructureDefinition({ id: "sup"})).then(() => {
            const gotActions = store.getActions();
            expect(gotActions[0]).toEqual(expectedActions[0]);
            expect(gotActions[1]).toEqual(expectedActions[1]);
            expect(gotActions[2]).toEqual(expectedActions[2]);
            expect(gotActions[3]).toEqual(expectedActions[3]);
        });
    });

    it('sets error if update structure definition api call fails', () => {
        // const scope = nock('http://localhost:8080').log(console.log)
        //     .get('/structureDefinitions')
        //     .reply(200, { payload: [1,2,3] });
        //
        let stub = sandbox.stub($, 'ajax').callsFake( () => (
            new Promise(function(resolve, reject) {
                reject();
            })
        ));


        return store.dispatch(actions.updateStructureDefinition({ id: "sup"})).then(() => {
            expect(store.getActions()[1]).toMatchObject({"type": "structureDefinition/SET_ERROR" });
        });
    });

    it('makes an add structure definition api call', () => {
        // const scope = nock('http://localhost:8080').log(console.log)
        //     .get('/structureDefinitions')
        //     .reply(200, { payload: [1,2,3] });
        //
        let stub = sandbox.stub($, 'ajax').callsFake( () => (
            new Promise(function(resolve, reject) {
                resolve( [1,2,3] );
            })
        ));

        const expectedActions = [
            { type: 'structureDefinition/CREATE' },
            { type: "modal/HIDE", modalType: undefined},
            { type: 'structureDefinition/REQUEST' },
            { type: 'structureDefinition/RECEIVE', payload: [1,2,3]  }
        ];

        return store.dispatch(actions.addStructureDefinition({})).then(() => {
            const gotActions = store.getActions();
            expect(gotActions[0]).toEqual(expectedActions[0]);
            expect(gotActions[1]).toEqual(expectedActions[1]);
            expect(gotActions[2]).toEqual(expectedActions[2]);
            expect(gotActions[3]).toEqual(expectedActions[3]);
        });
    });

    it('sets error if add structure definition api call fails', () => {
        // const scope = nock('http://localhost:8080').log(console.log)
        //     .get('/structureDefinitions')
        //     .reply(200, { payload: [1,2,3] });
        //
        let stub = sandbox.stub($, 'ajax').callsFake( () => (
            new Promise(function(resolve, reject) {
                reject();
            })
        ));


        return store.dispatch(actions.addStructureDefinition({})).then(() => {
            expect(store.getActions()[1]).toMatchObject({"type": "structureDefinition/SET_ERROR" });
        });
    });

    describe("Fetching image", () => {
        it('makes a fetch image api call', () => {
        // const scope = nock('http://localhost:8080').log(console.log)
        //     .get('/structureDefinitions')
        //     .reply(200, { payload: [1,2,3] });
        //
        let stub = sandbox.stub($, 'ajax').callsFake( () => (
            new Promise(function(resolve, reject) {
                resolve( [1,2,3] );
            })
        ));

        const expectedActions = [
            { type: 'structureDefinition/REQUEST_IMAGE' },
            { type: 'structureDefinition/RECEIVE_IMAGE', payload: { definition: {}, image: [1,2,3] }  }
        ];

        return store.dispatch(actions.fetchSDImageSize({})).then(() => {
            const gotActions = store.getActions();
            expect(gotActions[0]).toEqual(expectedActions[0]);
            expect(gotActions[1]).toEqual(expectedActions[1]);
        });
    });

    it('sets error if fetch image api call fails', () => {
        // const scope = nock('http://localhost:8080').log(console.log)
        //     .get('/structureDefinitions')
        //     .reply(200, { payload: [1,2,3] });
        //
        let stub = sandbox.stub($, 'ajax').callsFake( () => (
            new Promise(function(resolve, reject) {
                reject();
            })
        ));


        return store.dispatch(actions.fetchSDImageSize({})).then(() => {
            expect(store.getActions()[1]).toMatchObject({"type": "structureDefinition/SET_ERROR" });
        });
    });
    })
})
