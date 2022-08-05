import * as React from "react";
import { PageProps, graphql } from "gatsby";
import NavBar from "../components/NavBar";
import Head from "../components/Head";
import { DataNode, allDataJson } from "../models/Types";
import SideshowAffiliateLinkFinder from "../helpers/SideshowAffiliateLinkFinder";
import ProductLinkGenerator from "../helpers/ProductLinkGenerator";
import Card from "../components/Card";
import Pagination from "../components/Pagnation";
import SideshowImageHelper from "../helpers/ImageHelper";

type data = {
  allDataJson: allDataJson;
};

type productContext = {
  affiliates: DataNode[]
  currentPage: number
  numberOfPages: number
  url: string
};

const affiliateLinkFinder = new SideshowAffiliateLinkFinder();
const productLinkGenerator = new ProductLinkGenerator();
const imageHelper = new SideshowImageHelper();
const AllProducts = (data: PageProps<data, productContext>) => {
  return (
    <main>
      <NavBar></NavBar>
      <Head title="All Products"></Head>

      <div className="container my-4">
        <div className="row">
          <div className="col">
            <h1>All Products</h1>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Pagination currentPage={data.pageContext.currentPage} numberOfPages={data.pageContext.numberOfPages} url={data.pageContext.url}></Pagination>
          </div>
        </div>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {data.data.allDataJson.nodes.map((item) => (
            <div className="col">
              <Card
                name={item.Name}
                thumbnailImageUrl={item.Images !== null ? item.Images[0] : ""}
                url={item.Link}
                productUrl={productLinkGenerator.CreateProductLink(
                  item.Brand,
                  item.Name
                )}
              ></Card>
            </div>
          ))}
        </div>
        <div className="row">
          <div className="col">
            <Pagination currentPage={data.pageContext.currentPage} numberOfPages={data.pageContext.numberOfPages} url={data.pageContext.url}></Pagination>
          </div>
        </div>
      </div>
    </main>
  );
};

export const query = graphql`
  query allProductsQuery($skip: Int!, $limit: Int!) {
        allDataJson(limit: $limit, skip: $skip) {
          nodes {
            Brand
            Description
            Images
            Link
            Name
            Price
          }
        }      
  }
`;

export default AllProducts;
