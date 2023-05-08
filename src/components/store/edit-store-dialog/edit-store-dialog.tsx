import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import React, { useEffect, useState } from "react";
import { updateStore } from "../../../services/store.service";
import { Checkbox } from "primereact/checkbox";
import { StoresModel } from "../../../models/StoresModel";
import { useTranslation } from "react-i18next";


const EditStoreDialog = (props) => {
    
    useEffect(() => {
        setEditStoreModel(props.selectedStore)
    }, [props.selectedStore]);

    const { t } = useTranslation();

    
    const [checkBoxChecked, setCheckBoxChecked] = useState(true);

    const [formHasErrors, setFormHasError] = useState(false);

    const [editStoreModel, setEditStoreModel] = useState(new StoresModel());


    const onChangeInputText = (e, name: string) => {

        const val = (e.target && e.target.value) || '';

        let _newStoreModel = { ...editStoreModel };

        _newStoreModel[`${name}`] = val;

        setEditStoreModel(_newStoreModel);
    }

    const requiredEnglishName = () => {
        return !editStoreModel.description_p;
        };
    
    const isValidForm = (): boolean => {
        if (
            requiredEnglishName() 
         
        ) {
            setFormHasError(true);
            return false;
        }
        setFormHasError(false);
        return true;
    };
   
    const onSaveCicked = () => {
        let _newStoreModel = {...editStoreModel};
        _newStoreModel.active_flag = checkBoxChecked? 'Y': 'N';
        if (isValidForm()) {
            updateStore(editStoreModel).then(() => {
                props.updateSuccessEvent();
            });
        }
    };

    const storeDialogFooter = (
        <React.Fragment>
            <Button
                label={t("CANCEL")}
                icon="pi pi-times"
                outlined
                onClick={props.hideUpdateStoreDialog}
            />
            <Button label={t("SAVE")} icon="pi pi-check" onClick={onSaveCicked} />
        </React.Fragment>
    );


    if(editStoreModel){
        return (
            <div>
            <Dialog  
                visible={props.isEditStoreDialogVisible}
                style={{ width: "50vw " }}
                breakpoints={{ "960px": "75vw", "641px": "90vw" }}
                header={t("STORE_DETAILS")}
                modal
                className="p-fluid"
                footer={storeDialogFooter}
                onHide={props.hideUpdateStoreDialog}>

                <div className="responsive-grid">
                <div className="field">
                    <label htmlFor="id" className="font-bold">
                    {t("STORE_CODE")}
                    </label>
                    <InputText
                        disabled={true}
                        id="storecode"
                        value={editStoreModel.store_code}
                        required
                        autoFocus/>
                </div>

                <div className="field">
                    <label htmlFor="description_p" className="font-bold">
                    {t("ENGLISH_NAME")}
                    </label>
                    <InputText
                        id="description_p"
                        value={editStoreModel.description_p}
                        required
                        autoFocus
                        onChange={(e) => { onChangeInputText(e, "description_p") }}/>
                        {formHasErrors && requiredEnglishName() && <small className="p-error">({t("FIELD_REQUIRED")})</small>}
                </div>

                <div className="field">
                    <label htmlFor="description_s" className="font-bold">
                    {t("ARABIC_NAME")}
                    </label>
                    <InputText
                        id="description_s"
                        value={editStoreModel.description_s}
                        required
                        onChange={(e) => { onChangeInputText(e, "description_s") }}/>
                </div>

                <div className="field">
                    <label htmlFor="phone" className="font-bold">
                        {t("PHONE")}
                    </label>
                    <InputText
                        id="phone"
                        value={editStoreModel.phone}
                        required
                        onChange={(e) => { onChangeInputText(e, "phone") }}/>
                </div>

                <div className="field">
                    <label htmlFor="address" className="font-bold">
                         {t("ADDRESS")}
                    </label>
                    <InputText
                        id="address"
                        value={editStoreModel.address}
                        required
                        onChange={(e) => { onChangeInputText(e, "address") }}/>
                </div>

                <div className="field">
                    <label htmlFor="city" className="font-bold">
                     {t("CITY")}
                    </label>
                    <InputText
                        id="city"
                        value={editStoreModel.city}
                        required
                        onChange={(e) => { onChangeInputText(e, "city") }} />
                </div>

                <div className="field">
                    <label htmlFor="city_name" className="font-bold">
                    {t("CITY_NAME")}
                    </label>
                    <InputText
                        id="city name"
                        value={editStoreModel.city_name}
                        required
                        onChange={(e) => { onChangeInputText(e, "city_name") }}/>
                </div>

                <div className="field">
                    <label htmlFor="district" className="font-bold">
                    {t("DISTRICT")}
                    </label>
                    <InputText
                        id="district"
                        value={editStoreModel.district}
                        required
                        onChange={(e) => { onChangeInputText(e, "district") }}/>
                </div>

                <div className="field">
                    <label htmlFor="district_name" className="font-bold">
                    {t("DISTRICT_NAME")}
                    </label>
                    <InputText
                        id="district_name"
                        value={editStoreModel.district_name}
                        required
                        onChange={(e) => { onChangeInputText(e, "district_name") }}/>
                </div>

                <div className="field">
                    <label htmlFor="email" className="font-bold">
                    {t("EMAIL")}
                    </label>
                    <InputText
                        id="email"
                        value={editStoreModel.email}
                        required
                        onChange={(e) => { onChangeInputText(e, "email") }}/>
                </div>

                <div className="field">
                    <label htmlFor="governorate" className="font-bold">
                    {t("GOVERNORATE")}
                    </label>
                    <InputText
                        id="governorate"
                        value={editStoreModel.governorate}
                        required
                        onChange={(e) => { onChangeInputText(e, "governorate") }} />
                </div>

                <div className="field">
                    <label htmlFor="mobile" className="font-bold">
                    {t("MOBILE")}
                    </label>
                    <InputText
                        id="mobile"
                        value={editStoreModel.mobile}
                        required
                        onChange={(e) => { onChangeInputText(e, "mobile") }}/>
                </div>

                <div className="field">
                    <label htmlFor="min_order" className="font-bold">
                    {t("MIN_ORDER")}
                    </label>
                    <InputText
                        id="min_order"
                        value={editStoreModel.min_order}
                        required
                        onChange={(e) => { onChangeInputText(e, "min_order") }}/>
                </div>

                <div className="field  flex justify-content-center">
                    <label htmlFor="active_flag" className="font-bold ">
                    {t("ACTIVE")}
                    </label>
                    <Checkbox
                        id="active_flag"
                        onChange={e => setCheckBoxChecked(e.checked)} checked={checkBoxChecked}
                    ></Checkbox>
                </div>
                </div>

            </Dialog>
        </div>
        );
    }

    
};

export default EditStoreDialog;
