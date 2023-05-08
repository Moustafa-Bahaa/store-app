import axios, { AxiosError } from 'axios';

import { StoresModel } from '../models/StoresModel';
import { StoreSearchResultMoldel } from '../models/StoreSearchResultModel';
import { StorePostModel } from '../models/StorePostModel';
import { RecordStatus } from '../enums/record-status.enum';


const GET_URL = "http://149.102.140.8:9090/ords/exsysexsysdba/pds_pkg/get_pds_stores_data?poffset=0&poffset_step=200&planguageid=1&authorization=4776317&description_p=&city=&district=&active_flag=";

const DML_URL = "http://149.102.140.8:9090/ords/exsysexsysdba/pds_pkg/pds_stores_dml"

export const getAllStores = async (): Promise<any> => {
    try {
        const { data } = await axios.get(GET_URL);
        return data;

    } catch (error) {
        logError(error);
        return []
    }
}


export const filterStoresByActiveFlag = async (activeFlag: 'Y' | 'N'): Promise<any> => {
    try {
        const { data } = await axios.get(GET_URL + activeFlag);
        return data;

    } catch (error) {
        logError(error);
        return []
    }
}


export const saveNewStore = async (store: StoresModel): Promise<any[]> => {

    let payLoad = createNewPayload(store, RecordStatus.NEW)

    try {
        const { data } = await axios.post(DML_URL, payLoad);
        return data;

    } catch (error) {
        logError(error);
        return []
    }
}

export const deleteStore = async (store: StoresModel): Promise<Boolean> => {

    store.active_flag = "Y";
    let payLoad = createNewPayload(store, RecordStatus.DELETE)

    const { status } = await axios.post(DML_URL, payLoad);
    return status === 200
}



export const updateStore = async (store: StoresModel): Promise<any[]> => {

    let payLoad = createNewPayload(store, RecordStatus.UPDATE)

    try {
        const { data } = await axios.post(DML_URL, payLoad);
        return data

    } catch (error) {
        logError(error);
        return []
    }
}

const logError = (error: any) => {
    const err = error as AxiosError
    console.log(err.message)
    console.log(err.name)
};

const createNewPayload = (store: StoresModel, recordStatus: string): StorePostModel => {

    store.record_status = recordStatus;

    let storePostModel: StorePostModel = new StorePostModel();
    storePostModel.authorization = 4776317;
    storePostModel.planguageid = 1;
    storePostModel.data = [store];

    return storePostModel;
}