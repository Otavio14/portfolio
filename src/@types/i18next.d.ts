import { EN_US } from "../locales/en-us/index.i18n";

export type IResource = typeof EN_US;

export type IResources = {
  "en-us": IResource;
  "pt-br": IResource;
};

declare module "i18next" {
  interface CustomTypeOptions {
    resources: IResource;
  }
}
