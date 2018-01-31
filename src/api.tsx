import $ from 'jquery';

const url = 'http://localhost:8080';

export const defaultHeaders = {
    // instanceId: Cookies.get('svp_instance_id') || "SCU_SOB",
    ltiName: 'mapeditor', //Though this isn't really an lti...
    'Content-Type': 'application/json'
};

export const defaultConfig = {
    headers: defaultHeaders
};

export function getStructureDefinitions () {
    const config = { ...defaultConfig, url: `${url}/structureDefinitions`, type: "GET" };
    return $.ajax(config);
}
