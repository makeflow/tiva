import * as _ from 'lodash';

import {LanguageServiceHelper} from './language-service-helper';

export interface ValidatorConfigOptions {
  project: string;
  fileName: string;
  typeName: string;
  extensions?: {[key: string]: Function};
}

export class Validator {
  /** @internal */
  private static optionsPathTolanguageServiceHelperMap: Map<
    string,
    LanguageServiceHelper
  > = new Map();

  /** @internal */
  private optionsPath: string;

  /** @internal */
  private fileId: number;

  constructor(validatorConfigOptions: ValidatorConfigOptions) {
    const config = validatorConfigOptions;
    const optionsPath = (this.optionsPath = config.project);

    if (config.fileName === undefined) {
      throw new Error('file name is not specified.');
    }

    if (config.typeName === undefined) {
      throw new Error('type name is not specified');
    }

    if (!Validator.optionsPathTolanguageServiceHelperMap.has(optionsPath)) {
      Validator.optionsPathTolanguageServiceHelperMap.set(
        optionsPath,
        new LanguageServiceHelper(optionsPath),
      );
    }

    let languageServiceHelper = Validator.optionsPathTolanguageServiceHelperMap.get(
      optionsPath,
    )!;

    this.fileId = languageServiceHelper.add(
      config.fileName,
      config.typeName,
      config.extensions,
    );
  }

  validate(obj: object) {
    Validator.optionsPathTolanguageServiceHelperMap
      .get(this.optionsPath)!
      .validate(this.fileId, obj);
  }

  test(obj: object): boolean {
    try {
      this.validate(obj);
      return true;
    } catch (e) {
      return false;
    }
  }
}
