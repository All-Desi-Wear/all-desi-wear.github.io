import * as React from "react";
import { PageProps, graphql } from "gatsby";
import NavBar from "../components/NavBar";
import Head from "../components/Head";
import { result, allCustomApi, allDataJson } from "../models/Types";
import SideshowAffiliateLinkFinder from "../helpers/SideshowAffiliateLinkFinder";
import ProductLinkGenerator from "../helpers/ProductLinkGenerator";
import Card from "../components/Card";
import SideshowImageHelper from "../helpers/ImageHelper";


type data = {
  allDataJson: allDataJson;
};
const affiliateLinkFinder = new SideshowAffiliateLinkFinder();
const productLinkGenerator = new ProductLinkGenerator();
const imageHelper = new SideshowImageHelper();
const BrandPage = (data: PageProps<data, result>) => {
  return (
    <main>
      <NavBar></NavBar>
      <Head title={data.pageContext.brand}></Head>

      <div className="container my-4">
        <div className="row">
          <div className="col">
            <h1>{data.pageContext.brand}</h1>
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
      </div>
    </main>
  );
};

export const query = graphql`
  query MyQuery($brand: String) {
    allDataJson(filter: { Brand: { eq: $brand } }) {
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

export default BrandPage;
