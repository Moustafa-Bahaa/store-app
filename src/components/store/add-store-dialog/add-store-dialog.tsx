import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import React, { useState } from 'react';
import { saveNewStore } from '../../../services/store.service';
import { Checkbox } from "primereact/checkbox";
import { StoresModel } from '../../../models/StoresModel';
import { useTranslation } from "react-i18next";


const AddStoreDialog = (props) => {
        const { t } = useTranslation();


    const [newStoreModel, setNewStoreModel] = useState(new StoresModel());

    const [checkBoxChecked, setCheckBoxChecked] = useState(true);

    const [formHasErrors, setFormHasError] = useState(false);


    const onChangeInputText = (e, name: string) => {

        const val = (e.target && e.target.value) || '';

        let _newStoreModel = { ...newStoreModel };

        _newStoreModel[`${name}`] = val;

        setNewStoreModel(_newStoreModel);
    }
    const requiredEnglishName = () => {
        return !newStoreModel.description_p;
        };
    const isValidForm = (): boolean => {
        if (!newStoreModel.description_p) {
            setFormHasError(true);
            return false;
        }
        setFormHasError(false);
        return true;
    };

    const onSaveCicked = () => {
        if (isValidForm()) {

            let _newStoreModel = {...newStoreModel};
            _newStoreModel.active_flag = checkBoxChecked? 'Y': 'N';

            saveNewStore(_newStoreModel).then(() => {
                props.saveSuccessEvent();
            });
        }
    }

    const storeDialogFooter = (
        <React.Fragment>
            <Button label={t("CANCEL")} icon="pi pi-times" outlined onClick={props.hideAddStoreDialog} />
            <Button label={t("SAVE")} icon="pi pi-check" onClick={onSaveCicked} />
        </React.Fragment>
    );

    return (
        <div>
            <Dialog visible={props.isStoreDialogVisible} style={{ width: '50vw' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header={("STORE_DETAILS")}
                modal className="p-fluid" footer={storeDialogFooter} onHide={props.hideAddStoreDialog}>
             <div className='responsive-grid' >             
                <div className="field">
                    <label htmlFor="description_p" className="font-bold">
                    {t("ENGLISH_NAME")}
                    </label>
                    <InputText
                        id="description_p"
                        value={newStoreModel.description_p}
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
                        value={newStoreModel.description_s}
                        required
                        onChange={(e) => { onChangeInputText(e, "description_s") }}/>
                </div>

                <div className="field">
                    <label htmlFor="phone" className="font-bold">
                    {t("PHONE")}
                    </label>
                    <InputText
                        id="phone"
                        value={newStoreModel.phone}
                        required
                        onChange={(e) => { onChangeInputText(e, "phone") }}/>
                </div>

                <div className="field">
                    <label htmlFor="address" className="font-bold">
                    {t("ADDRESS")}
                    </label>
                    <InputText
                        id="address"
                        value={newStoreModel.address}
                        required
                        onChange={(e) => { onChangeInputText(e, "address") }}/>
                </div>

                <div className="field">
                    <label htmlFor="city" className="font-bold">
                    {t("CITY")}
                    </label>
                    <InputText
                        id="city"
                        value={newStoreModel.city}
                        required
                        onChange={(e) => { onChangeInputText(e, "city") }}/>
                </div>

                <div className="field">
                    <label htmlFor="city_name" className="font-bold">
                    {t("CITY_NAME")}
                    </label>
                    <InputText
                        id="city name"
                        value={newStoreModel.city_name}
                        required
                        onChange={(e) => { onChangeInputText(e, "city_name") }}/>
                </div>

                <div className="field">
                    <label htmlFor="district" className="font-bold">
                    {t("DISTRICT")}
                    </label>
                    <InputText
                        id="district"
                        value={newStoreModel.district}
                        required
                        onChange={(e) => { onChangeInputText(e, "district") }}/>
                </div>
                <div className="field">
                    <label htmlFor="district_name" className="font-bold">
                    {t("DISTRICT_NAME")}
                    </label>
                    <InputText
                        id="district_name"
                        value={newStoreModel.district_name}
                        required
                        onChange={(e) => { onChangeInputText(e, "district_name") }}/>
                </div>

                <div className="field">
                    <label htmlFor="email" className="font-bold">
                    {t("EMAIL")}
                    </label>
                    <InputText
                        id="email"
                        value={newStoreModel.email}
                        required
                        onChange={(e) => { onChangeInputText(e, "email") }}/>
                </div>

                <div className="field">
                    <label htmlFor="governorate" className="font-bold">
                    {t("GOVERNORATE")}
                    </label>
                    <InputText
                        id="governorate"
                        value={newStoreModel.governorate}
                        required
                        onChange={(e) => { onChangeInputText(e, "governorate") }}/>
                </div>

                <div className="field">
                    <label htmlFor="mobile" className="font-bold">
                    {t("MOBILE")}
                    </label>
                    <InputText
                        id="mobile"
                        value={newStoreModel.mobile}
                        required
                        onChange={(e) => { onChangeInputText(e, "mobile") }}/>
                </div>

                <div className="field">
                    <label htmlFor="min_order" className="font-bold">
                    {t("MIN_ORDER")}
                    </label>
                    <InputText
                        id="min_order"
                        value={newStoreModel.min_order}
                        required
                        onChange={(e) => { onChangeInputText(e, "min_order") }}/>
                </div>

                <div className="field flex justify-content-center">
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
    )
}

export default AddStoreDialog


