export const FETCH_ENDPOINTS = 'FETCH_ENDPOINTS'
export const UPDATE_ENDPOINTS = 'UPDATE_ENDPOINTS'
export const SELECT_ENDPOINTS = 'SELECT_ENDPOINTS'
export const SELECT_VERSION_ENDPOINT = 'SELECT_VERSION_ENDPOINT'
export const RUN_ENDPOINT = 'RUN_ENDPOINT'
export const INSERT_REQUEST = 'INSERT_REQUEST'
export const UPDATE_REQUEST_STATUS = 'UPDATE_REQUEST_STATUS'
export const UPDATE_REQUEST_ERROR = 'UPDATE_REQUEST_ERROR'
export const SET_PATH = 'SET_PATH'

export const fetchEndpoints = ( version = '1' ) => ( { type: FETCH_ENDPOINTS, version } )
export const updateEndpoints = ( endpoints, version ) => ( { type: UPDATE_ENDPOINTS, endpoints, version } )
export const selectEndpoints = version => ( { type: SELECT_ENDPOINTS, version } )
export const selectVersionEndpoint = ( version, id ) => ( { type: SELECT_VERSION_ENDPOINT, version, id } )
export const runEndpoint = ( version, endpoint ) => ( { type: RUN_ENDPOINT, endpoint, version } )
export const insertLog = ( version, endpoint, id ) => ( { type: INSERT_REQUEST, version, endpoint, id } )
export const updateRequestStatus = ( id, status ) => ( { type: UPDATE_REQUEST_STATUS, id, status } )
export const updateRequestError = ( id, error ) => ( { type: UPDATE_REQUEST_ERROR, id, error } )
export const setPath = ( path ) => ( { type: SET_PATH, path } )
