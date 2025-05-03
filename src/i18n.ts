import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { IResources } from "./@types/i18next";
import { EN_US } from "./locales/en-us/index.i18n";
import { PT_BR } from "./locales/pt-br/index.i18n";

export const resources: IResources = {
  "en-us": EN_US,
  "pt-br": PT_BR,
};

i18n.use(initReactI18next).init({
  resources,
  lng: "pt-br",
  lowerCaseLng: true,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
