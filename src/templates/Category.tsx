import * as React from "react";
import { PageProps, graphql } from "gatsby";
import NavBar from "../components/NavBar";
import Head from "../components/Head";
import { result, allDataJson } from "../models/Types";
import ProductLinkGenerator from "../helpers/ProductLinkGenerator";
import Card from "../components/Card";
import SideshowImageHelper from "../helpers/ImageHelper";


type data = {
  allDataJson: allDataJson;
};
const productLinkGenerator = new ProductLinkGenerator();
const imageHelper = new SideshowImageHelper();
const CategoryPage = (data: PageProps<data, result>) => {
  return (
    <main>
      <NavBar></NavBar>
      <Head title={data.pageContext.category}></Head>

      <div className="container my-4">
        <div className="row">
          <div className="col">
            <h1>{data.pageContext.category}</h1>
          </div>
        </div>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {data.data.allDataJson.nodes.map((item) => (
            <div className="col">
              <Card
                name={item.Name}
                thumbnailImageUrl={imageHelper.GetImageLink(item.Image)}
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
  query Category($category: String) {
    allDataJson(filter: { Category: { eq: $category } }) {
      nodes {
        Brand
        Description
        Image
        Link
        Name
        Price
        Category
      }
    }
  }
`;

export default CategoryPage;
