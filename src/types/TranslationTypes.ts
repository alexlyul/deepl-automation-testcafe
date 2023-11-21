import {languages} from "./languages";

type TranslationTypes = Partial<Record<keyof typeof languages, string>>;
type TranslationResult = Record<string, TranslationTypes>;


export type {
    TranslationTypes,
    TranslationResult,
}
