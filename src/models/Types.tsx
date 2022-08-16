export type data = {
    allDataJson : allDataJson
}

export type allDataJson = {
    nodes: DataNode[]
}

export type DataNode = {
    Brand : string
    BrandUrl : string
    Id : string
    BrandProductId : string
    Description : string
    Image : string
    AffiliateLink : string
    Name : string
    Price : string
    Category : string
    CategoryUrl : string
    Url : string
}
