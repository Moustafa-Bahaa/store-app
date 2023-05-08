import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Toast } from "primereact/toast";
import React, { useLayoutEffect, useRef, useState } from 'react';
import { StoreSearchResultMoldel } from '../../../models/StoreSearchResultModel';
import { StoresModel } from '../../../models/StoresModel';
import { filterStoresByActiveFlag, getAllStores } from '../../../services/store.service';
//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";
//core
import { RadioButton } from "primereact/radiobutton";
import "primereact/resources/primereact.min.css";
import AddStoreDialog from '../add-store-dialog/add-store-dialog';
import DeleteStoreDialog from '../delete-store-dialog/delete-store-dialog';
import EditStoreDialog from '../edit-store-dialog/edit-store-dialog';
import { useTranslation } from "react-i18next";


export default function AllStoresTable(props) {
    const { t } = useTranslation();
    const toast = useRef(null);
    const dt = useRef(null)


    const [isLoading, setLoading] = useState(true);

    const [storeSearchResult, setStoreSearchResult] = useState(new StoreSearchResultMoldel());


    const [selectedStore, setSelectedStore] = useState(null);

    // add dialog
    const [isStoreDialogVisible, setIsStoreDialogVisible] = useState(false);

    // delete dialog
    const [isDeleteStoreDialogVisible, setIsDeleteStoreDialogVisible] = useState(false);

    // edit dialog
    const [isEditStoreDialogVisible, setIsEditStoreDialogVisible] = useState(false);

    const [filterOption, setFilterOption] = useState('all');


    const fetchAllStores = () => {
        getAllStores().then((storeSearchResultMoldel: StoreSearchResultMoldel) => {
            setStoreSearchResult(storeSearchResultMoldel);
            setLoading(false);
        })
    }

    const filterByActiveFlag = (activeFlag: 'Y' | 'N') => {
        filterStoresByActiveFlag(activeFlag).then((storeSearchResultMoldel: StoreSearchResultMoldel) => {
            setStoreSearchResult(storeSearchResultMoldel);
        });
    }

    useLayoutEffect(() => {
        fetchAllStores();
    }, []);

    const openAddStoreDialog = () => {
        setIsStoreDialogVisible(true);
    };

    const hideAddStoreDialog = () => {
        setIsStoreDialogVisible(false);
    };

    const openDeleteStoreDialog = (selectedStore: StoresModel) => {
        setSelectedStore(selectedStore);
        setIsDeleteStoreDialogVisible(true);
    };

    const hideDeleteStoreDialog = () => {
        setIsDeleteStoreDialogVisible(false);
    };

    const saveSuccessEvent = () => {
        hideAddStoreDialog();
        afterSuccessEvent("STORE_ADD_SUCCESS_MSG");
    };

    const deleteSuccessEvent = () => {
        hideDeleteStoreDialog();
        afterSuccessEvent("STORE_DELETE_SUCCESS_MSG");
    };

    const hideUpdateStoreDialog = () => {
        setIsEditStoreDialogVisible(false);
    };

    const updateSuccessEvent = () => {
        hideUpdateStoreDialog();
        afterSuccessEvent("STORE_UPDATE_SUCCESS_MSG");
    };

    const openEditStoreDialog = (selectedStore: StoresModel) => {
        setSelectedStore(selectedStore);
        setIsEditStoreDialogVisible(true);
    };

    const afterSuccessEvent = (messageKey: string) => {
        fetchAllStores();
        toast.current.show({ severity: 'success', detail: t(messageKey), life: 3000 });
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-trash" rounded text severity="danger" aria-label="Bookmark" onClick={() => openDeleteStoreDialog(rowData)} tooltip={t("DELETE")} tooltipOptions={{ position: 'top' }} />
                <Button icon="pi pi-pencil" rounded text severity="warning" aria-label="Bookmark" onClick={() => openEditStoreDialog(rowData)} tooltip={t("EDIT")} tooltipOptions={{ position: 'top' }} />
            </React.Fragment>
        );
    };

    const leftToolbarTemplate = () => {
        return (
            <div className=" flex  table-header-conatainer">
                <Button label={t("NEW")} icon="pi pi-plus" severity="success" onClick={openAddStoreDialog} />
                <div className="card flex justify-content-center filter-form-container">
                    <div className="flex flex-wrap gap-3">
                        <div className="flex align-items-center radio">
                            <RadioButton inputId="ingredient1" name="all" value="all"
                                onChange={(e) => {
                                    setFilterOption(e.value);
                                    fetchAllStores()
                                }}
                                checked={filterOption === 'all'} />
                            <label htmlFor="ingredient1" className="ml-2">{t("ALL")}</label>
                        </div>

                        <div className="flex align-items-center radio">
                            <RadioButton inputId="ingredient2" name="Y" value="Y"
                                onChange={(e) => {
                                    setFilterOption(e.value);
                                    filterByActiveFlag('Y')
                                }}
                                checked={filterOption === 'Y'} />
                            <label htmlFor="ingredient2" className="ml-2">{t("ACTIVE")}</label>
                        </div>

                        <div className="flex align-items-center radio">
                            <RadioButton inputId="ingredient3" name="N" value="N"

                                onChange={(e) => {
                                    setFilterOption(e.value);
                                    filterByActiveFlag('N')
                                }}
                                checked={filterOption === 'N'} />
                            <label htmlFor="ingredient3" className="ml-2">{t("INACTIVE")}</label>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    if (isLoading) {
        return <div ><i className="pi pi-spin pi-spinner" style={{ fontSize: '2rem' }}></i></div>;
    }

    return (
        <div className="card border card-border rounded-md">
            <Toast ref={toast} />
            <div>
                <DataTable size='small' ref={dt} value={storeSearchResult.data}
                    dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} storeSearchResult" header={leftToolbarTemplate}>
                    <Column field="store_code" header={t("STORE_CODE")} sortable  ></Column>
                    <Column field="description_p" header={t("ENGLISH_NAME")} sortable  ></Column>
                    <Column field="description_s" header={t("ARABIC_NAME")} sortable  ></Column>
                    <Column field="governorate" header={t("GOVERNORATE")} sortable  ></Column>
                    <Column field="city_name" header={t("CITY_NAME")} sortable  ></Column>
                    <Column field="district" header={t("DISTRICT")} sortable  ></Column>
                    <Column field="address" header={t("ADDRESS")} sortable  ></Column>
                    <Column field="mobile" header={t("MOBILE")} sortable  ></Column>
                    <Column field="phone" header={t("PHONE")} sortable  ></Column>
                    <Column field="min_order" header={t("MIN_ORDER")} sortable  ></Column>
                    <Column field="active_flag" header={t("ACTIVE")} sortable  ></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
                </DataTable>
            </div>

            <EditStoreDialog
                selectedStore={selectedStore}
                isEditStoreDialogVisible={isEditStoreDialogVisible}
                hideUpdateStoreDialog={hideUpdateStoreDialog}
                updateSuccessEvent={updateSuccessEvent}>
            </EditStoreDialog >

            <AddStoreDialog
                isStoreDialogVisible={isStoreDialogVisible}
                hideAddStoreDialog={hideAddStoreDialog}
                saveSuccessEvent={saveSuccessEvent}>
            </AddStoreDialog >

            <DeleteStoreDialog
                selectedStore={selectedStore}
                isDeleteStoreDialogVisible={selectedStore && isDeleteStoreDialogVisible}
                hideDeleteStoreDialog={hideDeleteStoreDialog}
                deleteSuccessEvent={deleteSuccessEvent}>
            </DeleteStoreDialog >

        </div>
    );
}

