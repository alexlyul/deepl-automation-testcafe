import DeeplModel from "./DeeplModel";
import {languages} from "./types/languages";
import {TranslationResult} from "./types/TranslationTypes";
import * as fs from "fs";
import * as yaml from "yaml";


let OUTPUT_FORMAT: 'yaml'|'json' = 'yaml';
const SRC_LANGUAGE: keyof typeof languages = 'en';
const TRANSLATIONS: string[] = [
    'This is a test',
    'This is a test 2',
];


fixture('Getting Started')
    .page('https://www.deepl.com/en/translator');


test('translate to diff languages', async t => {
    const result: TranslationResult = {};

    await t.maximizeWindow();
    const d = new DeeplModel(t);
    await d.selectSrcLang(SRC_LANGUAGE);

    for (const srcString of TRANSLATIONS) {
        for (const [langKey, targetLanguage] of Object.entries(languages)) {
            if (!result[srcString]) {
                result[srcString] = {};
            }
            await d.typeSrcText(srcString);
            await d.selectTargetLang(targetLanguage);
            await t.wait(1000);
            result[srcString][langKey] = await d.getTranslatedText();
        }
    }

    switch (OUTPUT_FORMAT) {
        case "json":
            await fs.promises.writeFile('result.json', JSON.stringify(result, null, 2));
            break;
        case "yaml":
            await fs.promises.writeFile('result.yaml', yaml.stringify(result));
            break;
        default:
            throw new Error('Unknown output format');
    }

    console.log(result);
})
