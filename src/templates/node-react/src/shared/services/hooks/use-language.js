import React, { useEffect, useState, createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import { I18nProvider } from '@lingui/react';
import Cookies from 'universal-cookie';
// eslint-disable-next-line import/no-unresolved
import config from 'config';

const LocalizationContext = createContext();

const scapeKey = (str) => str.replace(/</g, '[[[[[[html_open]]]]]]').replace(/>/g, '[[[[[[html_close]]]]]]');

const transformCatalog = (catalog) => {
  const formattedMessages = Object.keys(catalog.messages).reduce((acc, key) => {
    acc[key] = `[[__phrase_${scapeKey(key)}__]]`;
    return acc;
  }, {});
  return { ...catalog, messages: formattedMessages };
};

export const Localization = ({ children, locale, catalogs, canEditTranslations }) => {
  const [showToggle, setShowToggle] = useState(false);
  const [isOver, setIsOver] = useState(false);
  const cookies = new Cookies();
  const inContextEdit = cookies.get('enable-context-translations');
  useEffect(() => {
    setShowToggle(true);
  }, []);
  const [localeData, setLocaleData] = useState({
    locale,
    catalogs: Object.entries(catalogs).reduce(
      (acc, [l, catalog]) => ({
        ...acc,
        [l]: inContextEdit ? transformCatalog(catalog) : catalog,
      }),
      {},
    ),
    dateFnsLocales: {},
  });
  useEffect(() => {
    if (inContextEdit && config.phraseapp && config.phraseapp.projectId) {
      window.PHRASEAPP_CONFIG = {
        autoLowercase: false,
        ...config.phraseapp,
        prefix: '[[__',
        suffix: '__]]',
      };
      const phraseapp = document.createElement('script');
      phraseapp.type = 'text/javascript';
      phraseapp.async = true;
      phraseapp.src = ['https://', 'phraseapp.com/assets/in-context-editor/2.0/app.js?', new Date().getTime()].join('');
      const s = document.getElementsByTagName('script')[0];
      if (s !== undefined) {
        s.parentNode.insertBefore(phraseapp, s);
      } else {
        document.insertBefore(phraseapp, null);
      }
    }
  }, []);
  useEffect(() => {
    if (localeData.catalogs[locale]) {
      setLocaleData(localeData);
      return;
    }
    Promise.all([import(`date-fns/locale/${locale === 'en' ? 'en-US' : locale}`), import(`services/locales/messages/${locale}/messages`)])
      .then(([datefnsLocale, { default: catalog }]) => {
        setLocaleData({
          locale,
          catalogs: {
            ...localeData.catalogs,
            [locale]: inContextEdit ? transformCatalog(catalog) : catalog,
          },
          dateFnsLocales: {
            ...localeData.dateFnsLocales,
            [locale]: datefnsLocale,
          },
        });
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  }, [locale, inContextEdit, localeData]);
  const changeInContext = () => {
    if (inContextEdit) {
      cookies.set('enable-context-translations', '', { sameSite: 'none' });
    } else {
      cookies.set('enable-context-translations', '1', { sameSite: 'none' });
    }
    // eslint-disable-next-line no-undef
    window.location.reload();
  };
  return (
    <LocalizationContext.Provider value={localeData}>
      {!localeData.catalogs[localeData.locale] ? (
        <div />
      ) : (
        <I18nProvider language={localeData.locale} catalogs={localeData.catalogs}>
          {children}
          {canEditTranslations && showToggle && (
            <div
              onMouseEnter={() => setIsOver(true)}
              onMouseLeave={() => setIsOver(false)}
              style={{
                position: 'fixed',
                bottom: '1rem',
                left: isOver ? '0' : '-3.5rem',
                zIndex: 100000,
                transition: 'left .25s',
              }}
            >
              <span role="presentation" onClick={changeInContext}>
                ENABLE
              </span>
            </div>
          )}
        </I18nProvider>
      )}
    </LocalizationContext.Provider>
  );
};

Localization.propTypes = {
  children: PropTypes.node.isRequired,
  locale: PropTypes.string,
  canEditTranslations: PropTypes.bool,
  catalogs: PropTypes.shape({}),
};

Localization.defaultProps = {
  locale: 'en',
  canEditTranslations: undefined,
  catalogs: {},
};

export default () => useContext(LocalizationContext);
