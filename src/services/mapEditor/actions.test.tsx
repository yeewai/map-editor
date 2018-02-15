import * as mapEditorActions from './actions';

describe ("Map Editor Actions ", () => {
    it ("has actions for controlling the camera", () => {
        expect(mapEditorActions.zoomIn()).toBeDefined();
        expect(mapEditorActions.zoomOut()).toBeDefined();
        expect(mapEditorActions.zoomReset()).toBeDefined();
        expect(mapEditorActions.panUp()).toBeDefined();
        expect(mapEditorActions.panDown()).toBeDefined();
        expect(mapEditorActions.panLeft()).toBeDefined();
        expect(mapEditorActions.panRight()).toBeDefined();
        expect(mapEditorActions.panReset()).toBeDefined();

    })
})
