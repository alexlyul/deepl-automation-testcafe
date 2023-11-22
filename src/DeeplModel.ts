import {ClientFunction, Selector, t} from "testcafe"

class DeeplModel {
    protected t: TestController;
    srcLangBtnSelector = Selector('[data-testid="translator-source-lang-btn"]');
    protected srcLangListBtnOption = Selector('[data-testid="translator-source-lang-list"] [data-testid^=translator-lang-option]');
    protected srcLangInput = Selector('[aria-labelledby="translation-source-heading"] d-textarea');
    protected targetLangBtnSelector = Selector('[data-testid="translator-target-lang-btn"]');
    protected targetLangListBtnOption = Selector('[data-testid="translator-target-lang-list"] [data-testid^=translator-lang-option]');
    protected translationSection = Selector('d-textarea[aria-labelledby="translation-target-heading"]');

    constructor(t: TestController) {
        this.t = t;
    }

    selectSrcLang(lang: string) {
        return this.t
            .click(this.srcLangBtnSelector)
            .click(this.srcLangListBtnOption.withText(lang));
    }

    selectTargetLang(lang: string) {
        return this.t
            .click(this.targetLangBtnSelector)
            .click(this.targetLangListBtnOption.withText(lang));
    }

    protected async textToClipboard(text: string) {
        const copy = ClientFunction((text: string) => {
            return new Promise(resolve => {
                navigator.clipboard.writeText(text).then(resolve)
            })
        })

        return copy(text);
    }

    async typeSrcText(text: string, clean = true) {
        await this.t.click(this.srcLangInput);
        if (clean) {
            await this.t.pressKey('ctrl+a delete');
        }
        await this.textToClipboard(text);
        await t.pressKey('ctrl+v');
    }

    async getTranslatedText() {
        return this.translationSection.textContent;
    }
}


export default DeeplModel;
