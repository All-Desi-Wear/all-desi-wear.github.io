import { graphql } from "gatsby";

export const productFragment = graphql`
fragment Product on DataJson {
    Brand
    BrandUrl
    Description
    Image
    AffiliateLink
    Name
    Price
    Category
    CategoryUrl
    Url
}
`