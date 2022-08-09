import * as React from "react";
import NavBar from "../components/NavBar";
import Head from "../components/Head";
import Card from "../components/Card";
import { result, allCustomApi, allDataJson } from "../models/Types";
import ProductLinkGenerator from "../helpers/ProductLinkGenerator";
import { graphql, PageProps } from "gatsby";
import Mirraw from "../images/mirraw.png";
import MonaLisa from "../images/monalisa-logo1.png";
import SherniLondon from "../images/shernilondon.webp";
import SideshowAffiliateLinkFinder from "../helpers/SideshowAffiliateLinkFinder";
import SideshowImageHelper from "../helpers/ImageHelper"


type data = {
  allDataJson: allDataJson;
};
const productLinkGenerator = new ProductLinkGenerator();
const affiliateLinkFinder = new SideshowAffiliateLinkFinder();
const imageHelper = new SideshowImageHelper();
const IndexPage = (data: PageProps<data, result>) => {
  return (
    <main>
      <NavBar></NavBar>
      <Head title="Your favourite collectibles all available here"></Head>
      <div className="container my-4">
        <div className="row row-cols-1 row-cols-md-3 g-4">
          <div className="col">
            <div className="card">
            <a href="/mirraw" style={{display:"inherit"}}> <img
                style={{ maxHeight: "200px", width: "100%" }}
                src={Mirraw}
                className="rounded mx-auto d-block-fluid"
                alt="Mirraw logo"
              /></a>
              <div className="card-footer text-muted">
                Mirraw
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card bg-dark mb-3">
            <a href="/monalie-sarees" style={{display:"inherit"}}><img
                style={{ maxHeight: "200px", width: "100%" }}
                src={MonaLisa}
                className="rounded mx-auto d-block-fluid"
                alt="Mona Lisa logo"
              /></a>
              <div className="card-footer text-muted">
                Monalie sarees
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card" style={{minHeight:"200px"}}>
            <a href="/sherni-london" style={{display:"inherit"}}><img
                style={{ maxHeight: "183px", width: "100%" }}
                src={SherniLondon}
                className="rounded mx-auto d-block-fluid"
                alt="Sherni London logo"
              /></a>
              <div className="card-footer text-muted">
              Sherni London
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-4 mb-4">
          <div className="col">
            <h1>Latest Products</h1>
          </div>
        </div>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {data.data.allDataJson.nodes.map((item) => (
            <div className="col">
              <Card name={item.Name} thumbnailImageUrl={item.Images!== null ? item.Images[0] :""} url={item.Link} productUrl={productLinkGenerator.CreateProductLink(item.Brand,item.Name)}></Card>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export const query = graphql`
  {
    allDataJson(limit: 6) {
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

export default IndexPage;
