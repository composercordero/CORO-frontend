import axios from 'axios';
// import types
import AddressType from '../types/AddressType';
import ConductorType from '../types/ConductorType';
import ChoirType from '../types/ChoirType';
import HymnType from '../types/HymnType';
import OrganizationType from '../types/OrganizationType';
import HymnDataType from '../types/HymnData';
// import ServiceType from '../types/ServiceType';

const base: string = 'http://127.0.0.1:8080/api'
// const base: string = 'https://coro-back-end.onrender.com/api'

// URL to access the api
const userEndpoint: string = '/users';
// const loginEndpoint: string = '/login';
const tokenEndpoint: string = '/token';
const addressEndpoint: string = '/address';
const organizationEndpoint: string = '/orgs';
const choirsEndpoint: string = '/choirs';
const hymnsEndpoint: string = '/hymns';
const programEndpoint: string = '/program';

const apiClientNoAuth = () => axios.create({baseURL: base});

const apiClientBasicAuth = (username:string, password:string) => axios.create({
    baseURL: base,
    headers: {
        Authorization: 'Basic ' + btoa(`${username}:${password}`)
}
})

const apiClientTokenAuth = (token:string) => axios.create({
    baseURL: base,
    headers: {
        Authorization: `Bearer ${token}`
    }
})

type APIResponse <T> = { error?: string, data?: T }
type TokenType = { token: string, token_exp: string }

// CREATE USER ------------------------------------------------------------------

async function createUser(newUserData:Partial<ConductorType>):Promise<APIResponse<ConductorType>> {
    let error;
    let data;
    try{
        const response = await apiClientNoAuth().post(userEndpoint, newUserData)
        data = response.data
        console.log('Response data:', data)
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return {error, data}
}

// LOGIN USER ------------------------------------------------------------------

async function loginUser(username:string, password:string):Promise<APIResponse<TokenType>> {
    let error;
    let data;
    try{
        const response = await apiClientBasicAuth(username, password).get(tokenEndpoint)
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return {error, data}
}

// EDIT USER ------------------------------------------------------------------

async function editUser(token:string, UserData:Partial<ConductorType>):Promise<APIResponse<ConductorType>> {
    let error;
    let data;
    try{
        const response = await apiClientTokenAuth(token).put(userEndpoint, UserData)
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return {error, data}
}

// DELETE USER ------------------------------------------------------------------

async function deleteUser(token:string):Promise<APIResponse<ConductorType>> {
    let error;
    let data;
    try{
        const response = await apiClientTokenAuth(token).delete(userEndpoint)
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return {error, data}
}

// GET ME ------------------------------------------------------------------

async function getMe(token:string): Promise<APIResponse<ConductorType>> {
    let error;
    let data;
    try{
        const response = await apiClientTokenAuth(token).get(userEndpoint + '/me');
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return {error, data}
}

// GET USER PROGRAMS ------------------------------------------------------------------

async function getUserPrograms(token:string): Promise<APIResponse<HymnDataType[]>> {
    let error;
    let data;
    try{
        const response = await apiClientTokenAuth(token).get(userEndpoint + '/programs');
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return {error, data}
}

// CREATE ADDRESS ------------------------------------------------------------------

async function createAddress(newAddressData:Partial<AddressType>):Promise<APIResponse<AddressType>> {
    let error;
    let data;
    try{
        const response = await apiClientNoAuth().post(addressEndpoint, newAddressData)
        data = response.data
        console.log('Response data:', data)
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return {error, data}
}

// EDIT ADDRESS ------------------------------------------------------------------

// CREATE ORGANIZATION ------------------------------------------------------------------

async function createOrganization(token:string, newOrganizationData:Partial<OrganizationType>):Promise<APIResponse<OrganizationType>> {
    let error;
    let data;
    try{
        const response = await apiClientTokenAuth(token).post(organizationEndpoint, newOrganizationData)
        data = response.data
        console.log('Response data:', data)
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return {error, data}
}

// EDIT ORGANIZATION BY ID ------------------------------------------------------------------

async function editOrganizationById(token:string, organizationId:string|number, editedOrganizationData:OrganizationType): Promise<APIResponse<OrganizationType>>{
    let error;
    let data;
    try {
        const response = await apiClientTokenAuth(token).put(organizationEndpoint + '/' + organizationId, editedOrganizationData);
        data = response.data
    } catch(err){
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return {error,data}
}

// DELETE ORGANIZATION BY ID ------------------------------------------------------------------

async function deleteOrganizationById(token:string, organizationId:string|number): Promise<APIResponse<OrganizationType>>{
    let error;
    let data;
    try {
        const response = await apiClientTokenAuth(token).delete(organizationEndpoint + '/' + organizationId);
        data = response.data
    } catch(err){
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return {error,data}
}
// CREATE CHOIR ------------------------------------------------------------------

async function createChoir(token:string, newChoirData:Partial<OrganizationType>):Promise<APIResponse<ChoirType>> {
    let error;
    let data;
    try{
        const response = await apiClientTokenAuth(token).post(choirsEndpoint, newChoirData)
        data = response.data
        console.log('Response data:', data)
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return {error, data}
}

// EDIT CHOIR BY ID ------------------------------------------------------------------

async function editChoirById(token:string, choirId:string|number, editedChoirData:ChoirType): Promise<APIResponse<ChoirType>>{
    let error;
    let data;
    try {
        const response = await apiClientTokenAuth(token).put(choirsEndpoint + '/' + choirId, editedChoirData);
        data = response.data
    } catch(err){
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return {error,data}
}

// DELETE CHOIR BY ID ------------------------------------------------------------------

async function deleteChoirById(token:string, choirId:string|number): Promise<APIResponse<ChoirType>>{
    let error;
    let data;
    try {
        const response = await apiClientTokenAuth(token).delete(choirsEndpoint + '/' + choirId);
        data = response.data
    } catch(err){
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return {error,data}
}

// CREATE HYMN BY ID ------------------------------------------------------------------

async function createHymnById(token:string, hymnId:string|number): Promise<APIResponse<HymnType>>{
    let error;
    let data;
    try {
        const response = await apiClientTokenAuth(token).post(hymnsEndpoint + '/' + hymnId);
        data = response.data
    } catch(err){
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return {error,data}
}

// PROGRAM HYMN ------------------------------------------------------------------

async function programHymnToService(token:string, hymnId:string|number, serviceId:string|number): Promise<APIResponse<ChoirType>>{
// NOT SURE ABOUT THE RETURN TYPE

    let error;
    let data;
    try {
        const response = await apiClientTokenAuth(token).post(programEndpoint + '/' + serviceId + '/' + hymnId);
        data = response.data
    } catch(err){
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return {error,data}
}

// PROGRAM HYMN BY DATE------------------------------------------------------------------

async function programHymnToServiceByDate(token:string, hymnId:string|number, serviceDate:string|number): Promise<APIResponse<ChoirType>>{
    // NOT SURE ABOUT THE RETURN TYPE
    
        let error;
        let data;
        try {
            const response = await apiClientTokenAuth(token).post(programEndpoint + '/' + serviceDate + '/' + hymnId);
            data = response.data
        } catch(err){
            if (axios.isAxiosError(err)){
                error = err.response?.data.error
            } else {
                error = 'Something went wrong'
            }
        }
        return {error,data}
    }

// EDIT PROGRAM HYMN ------------------------------------------------------------------

async function editProgramHymn(token:string, hymnId:string|number, serviceDate:string|number): Promise<APIResponse<ChoirType>>{
    
        let error;
        let data;
        try {
            const response = await apiClientTokenAuth(token).delete(programEndpoint + '/' + serviceDate + '/' + hymnId);
            data = response.data
        } catch(err){
            if (axios.isAxiosError(err)){
                error = err.response?.data.error
            } else {
                error = 'Something went wrong'
            }
        }
        return {error,data}
    }

// GET HYM TO DISPLAY ------------------------------------------------------------------

async function displayHymn(token:string, hymnId:number) {
    let error;
    let data;
    try{
        const response = await apiClientTokenAuth(token).get(hymnsEndpoint + '/display' + '/' + hymnId);
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return {error, data}
}

export {

    // CONDUCTOR (USER) 
    createUser,
    loginUser,
    editUser,
    deleteUser,
    getMe,
    getUserPrograms,

    // ADDRESS
    createAddress,

    // ORGANIZATION
    createOrganization,
    editOrganizationById,
    deleteOrganizationById,

    // CHOIR
    createChoir,
    editChoirById,
    deleteChoirById,

    // HYMN
    createHymnById,
   displayHymn,

    // PROGRAM
    programHymnToService,
    programHymnToServiceByDate,
    editProgramHymn
}