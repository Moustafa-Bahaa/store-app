import React from 'react'
import Languages from './languages/Languages'
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t } = useTranslation();

  return (
    <div >
        <div className='header-container' style={{backgroundColor: '#f8f9fa'}}>
          <h1>{t("WELCOME")}</h1>
            <Languages/>
        </div>
    </div>
  )
}

export default Header
