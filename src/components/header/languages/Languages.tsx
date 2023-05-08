import React, { useEffect, useRef, useState } from "react";
import Flags from "./flags";
import { AiOutlineCheck } from "react-icons/ai";
import { useTranslation } from "react-i18next";
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';

interface Language {
  name: string;
  code: string
}
const Languages = () => {

  const { t } = useTranslation();

  const { i18n } = useTranslation();

  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>( { name: t("EN") , code: 'en' });

  function changeLanguage(selectedLanguageCode) {
    i18n.changeLanguage(selectedLanguageCode);
  }

  const languages: Language[] = [
    { name: t("AR"), code: 'ar' },
    { name: t("EN"), code: 'en' },
  ];

  return (
    <div className="card flex justify-conent-center">
      <Dropdown value={selectedLanguage}
        onChange={(e: DropdownChangeEvent) => {
          setSelectedLanguage(e.value);
          changeLanguage(e.value.code);
        }}
        options={languages} optionLabel="name"
       placeholder={t("SELECT_LANGUAGE")}  className="w-full md:w-14rem" />
    </div>
  )
};

export default Languages;
