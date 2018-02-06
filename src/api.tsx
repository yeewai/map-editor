import $ from 'jquery';

// -------------------------------------------------------------
// Setup
// -------------------------------------------------------------
const url = 'http://localhost:8080';

export const defaultHeaders = {
    // instanceId: Cookies.get('svp_instance_id') || "SCU_SOB",
    ltiName: 'mapeditor', //Though this isn't really an lti...
    'Content-Type': 'application/json'
};

export const defaultConfig = {
    headers: defaultHeaders
};

// -------------------------------------------------------------
// Structure Definitions
// -------------------------------------------------------------
export const getStructureDefinitions = () =>  {
    const config = { ...defaultConfig, url: `${url}/structureDefinitions`, type: "GET" };
    return $.ajax(config);
}

export const createStructureDefinition = (body) => {
    const config = {
        ...defaultConfig,
        type: "POST",
        url: `${url}/structureDefinitions`,
        data: JSON.stringify( body )
    };
    return $.ajax(config);
};

export const updateStructureDefinition = (id, body) => {
    const config = {
        ...defaultConfig,
        type: "PUT",
        url: `${url}/structureDefinitions/${id}`,
        data: JSON.stringify( body )
    };
    return $.ajax(config);
}

// -------------------------------------------------------------
// Worlds
// -------------------------------------------------------------
export const getWorlds = () =>  {
    const config = { ...defaultConfig, url: `${url}/worlds`, type: "GET" };
    return $.ajax(config);
}

export const createWorld = (body) => {
    const config = {
        ...defaultConfig,
        type: "POST",
        url: `${url}/worlds`,
        data: JSON.stringify( body )
    };
    return $.ajax(config);
};
