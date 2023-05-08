
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import React from 'react';
import { deleteStore } from '../../../services/store.service';
import { useTranslation } from "react-i18next";

const DeleteStoreDialog = (props) => {

    const { t } = useTranslation();

    const onYesClicked = () => {
        deleteStore(props.selectedStore).then(() => {
            props.deleteSuccessEvent();
        });
    }

    const deleteStoreDialogFooter = (
        <React.Fragment>
            <Button label={t("NO")} icon="pi pi-times" outlined onClick={props.hideDeleteStoreDialog} />
            <Button label={t("YES")} icon="pi pi-check" severity="danger" onClick={onYesClicked} />
        </React.Fragment>
    );

    return (
        <div>

            <Dialog visible={props.isDeleteStoreDialogVisible} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }}
                header={t("CONFIRM")} modal footer={deleteStoreDialogFooter} onHide={props.hideDeleteStoreDialog}>
                <div className="confirmation-content ">
                    <i className="pi pi-exclamation-triangle mr-3 ml-3" style={{ fontSize: '2rem' }} />
                    {(
                        <span>
                            {t("ARE_YOU_SURE_YOU_WANT_TO_DELETE_THE_SELECTED_STORE")}
                        </span>
                    )}
                </div>
            </Dialog>


        </div>
    )
}

export default DeleteStoreDialog


