import React, { useEffect, createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { I18nProvider } from '@lingui/react';
import { i18n } from '@lingui/core';

const LocalizationContext = createContext();

export const Localization = ({ children, locale, messages }) => {
  const [localeData, setLocaleData] = useState({
    ...(locale && messages && { [locale]: messages }),
  });

  useEffect(() => {
    if (localeData[locale]) {
      i18n.load(locale, localeData[locale]);
      i18n.activate(locale);
      return;
    }
    import(`services/locales/${locale}/messages`).then((data) => {
      i18n.load(locale, data.messages);
      i18n.activate(locale);
      setLocaleData((currentData) => ({
        ...currentData,
        [locale]: data,
      }));
    });
  }, [locale, localeData]);

  if (!localeData[locale]) {
    return null;
  }

  return (
    <LocalizationContext.Provider value={{ locale }}>
      <I18nProvider i18n={i18n}>{children}</I18nProvider>
    </LocalizationContext.Provider>
  );
};

Localization.propTypes = {
  children: PropTypes.node.isRequired,
  messages: PropTypes.object,
  locale: PropTypes.string,
};

Localization.defaultProps = {
  locale: 'en',
  messages: undefined,
};

export default () => useContext(LocalizationContext);
