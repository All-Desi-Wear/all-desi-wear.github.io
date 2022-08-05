import SideshowUrlCleaner from "./SideshowUrlCleaner";

const urlCleaner = new SideshowUrlCleaner();

export default class ProductLinkGenerator {

    CreateProductLink(brand: string, name: string) {
        return `/${urlCleaner.Clean(brand)}/${urlCleaner.Clean(name)}`;
    }
}