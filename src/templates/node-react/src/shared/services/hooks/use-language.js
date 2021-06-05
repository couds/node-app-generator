import React, { useEffect, createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { I18nProvider } from '@lingui/react';
import { i18n } from '@lingui/core';

export { i18n };

const LocalizationContext = createContext();

export const loadLocale = (locale) => {
  return Promise.all([import(`services/locales/${locale}/messages`), import('make-plural/plurals')]).then(([data, plurals]) => {
    i18n.load(locale, data.messages);
    i18n.loadLocaleData(locale, { plurals: plurals[locale] });
    i18n.activate(locale);
    return { data, plurals };
  });
};

export const Localization = ({ children, locale }) => {
  const [localeData, setLocaleData] = useState({});

  useEffect(() => {
    if (localeData[locale]) {
      i18n.load(locale, localeData[locale]);
      i18n.activate(locale);
      return;
    }
    loadLocale(locale).then(({ data }) => {
      setLocaleData((currentData) => {
        return {
          ...currentData,
          [locale]: data,
        };
      });
    });
  }, [locale, localeData]);

  return (
    <LocalizationContext.Provider value={{ locale }}>
      <I18nProvider i18n={i18n}>{children}</I18nProvider>
    </LocalizationContext.Provider>
  );
};

Localization.propTypes = {
  children: PropTypes.node.isRequired,
  locale: PropTypes.string,
};

Localization.defaultProps = {
  locale: 'en',
};

export default () => {
  return useContext(LocalizationContext);
};
