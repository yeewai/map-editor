import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import * as actions from "./actions";
import sinon from 'sinon';
import $ from 'jquery';

import api from 'api';



const mockStore = configureMockStore([thunk]);

describe("Actions/worlds", () => {
    let sandbox, store;

    beforeEach( () => {
        sandbox = sinon.createSandbox();
        store = mockStore({});
    })

    afterEach(() => {
        sandbox.restore();
    })

    it('creates a success when fetching worlds has been done', () => {
        // const scope = nock('http://localhost:8080').log(console.log)
        //     .get('/worlds')
        //     .reply(200, { payload: [1,2,3] });
        //
        let stub = sandbox.stub($, 'ajax').callsFake( () => (
            new Promise(function(resolve, reject) {
                resolve( [1,2,3] );
            })
        ));

        const expectedActions = [
            { type: 'world/REQUEST' },
            { type: 'world/RECEIVE', payload: [1,2,3]  }
        ];

        return store.dispatch(actions.fetchWorlds()).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it ('creates a fail when fetching program fails', () => {
        // nock("http://localhost")
        //     .get('/worlds')
        //     .replyWithError("");
        let stub = sandbox.stub($, 'ajax').callsFake( () => (
            new Promise(function(resolve, reject) {
                reject();
            })
        ));
        const store = mockStore({});

        return store.dispatch(actions.fetchWorlds()).then(() => {
            expect(store.getActions()[1]).toMatchObject({  "type": "world/SET_ERROR" });
        });

    });

    it('makes an update structure definition api call', () => {
        // const scope = nock('http://localhost:8080').log(console.log)
        //     .get('/worlds')
        //     .reply(200, { payload: [1,2,3] });
        //
        let stub = sandbox.stub($, 'ajax').callsFake( () => (
            new Promise(function(resolve, reject) {
                resolve( [1,2,3] );
            })
        ));

        const expectedActions = [
            { type: 'world/PUT' },
            { type: "modal/HIDE", modalType: undefined},
            { type: 'world/REQUEST' },
            { type: 'world/RECEIVE', payload: [1,2,3]  }
        ];

        return store.dispatch(actions.updateWorld({ id: "sup"})).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    xit('sets error if update structure definition api call fails', () => {
        // const scope = nock('http://localhost:8080').log(console.log)
        //     .get('/worlds')
        //     .reply(200, { payload: [1,2,3] });
        //
        let stub = sandbox.stub($, 'ajax').callsFake( () => (
            new Promise(function(resolve, reject) {
                reject();
            })
        ));


        return store.dispatch(actions.updateWorld({ id: "sup"})).then(() => {
            expect(store.getActions()[1]).toMatchObject({"type": "world/SET_ERROR" });
        });
    });

    it('makes an add structure definition api call', () => {
        // const scope = nock('http://localhost:8080').log(console.log)
        //     .get('/worlds')
        //     .reply(200, { payload: [1,2,3] });
        //
        let stub = sandbox.stub($, 'ajax').callsFake( () => (
            new Promise(function(resolve, reject) {
                resolve( [1,2,3] );
            })
        ));

        const expectedActions = [
            { type: 'world/CREATE' },
            { type: "modal/HIDE", modalType: undefined},
            { type: 'world/REQUEST' },
            { type: 'world/RECEIVE', payload: [1,2,3]  }
        ];

        return store.dispatch(actions.addWorld({})).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('sets error if add structure definition api call fails', () => {
        // const scope = nock('http://localhost:8080').log(console.log)
        //     .get('/worlds')
        //     .reply(200, { payload: [1,2,3] });
        //
        let stub = sandbox.stub($, 'ajax').callsFake( () => (
            new Promise(function(resolve, reject) {
                reject();
            })
        ));


        return store.dispatch(actions.addWorld({})).then(() => {
            expect(store.getActions()[1]).toMatchObject({"type": "world/SET_ERROR" });
        });
    });
})
