import $ from 'jquery';



export const defaultHeaders = {
    // instanceId: Cookies.get('svp_instance_id') || "SCU_SOB",
    ltiName: 'mapeditor', //Though this isn't really an lti...
    'Content-Type': 'application/json'
};

export const defaultConfig = {
    headers: defaultHeaders
};

export function getStructureDefinitions () {
    const config = { ...defaultConfig, url: `http://localhost:8080/structureDefinitions` };
    return $.ajax(config);
}
