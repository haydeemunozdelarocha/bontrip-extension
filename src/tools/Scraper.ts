import {Logger} from "./Logger";

export class Scraper {

    public static containsText(text: string, matchValue: string): boolean {
        const regex = new RegExp(matchValue,'gi');
        Logger.log('wha', text.match(regex));
        return !!text.match(regex);
    }

    public static filterArrayByText(array: string[], searchValue: string) {
        Logger.log('filterArrayByText', [array, searchValue]);

        return array.filter((item: string) => Scraper.containsText(item, searchValue))
    }
}
