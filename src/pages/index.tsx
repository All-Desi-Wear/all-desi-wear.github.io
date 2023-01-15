import * as React from "react";
import NavBar from "../components/NavBar";
import Head from "../components/Head";
import Card from "../components/Card";
import { DataNode, data } from "../models/Types";
import { graphql, PageProps } from "gatsby";
import Mirraw from "../images/mirraw.png";
import MonaLisa from "../images/monalisa-logo1.png";
import SherniLondon from "../images/shernilondon.webp";
import ImageBackground from "../images/paisley-black-and-withe-vector-background-floral-abstract-design-pattern-indian-art-ornament-PPEFC4.jpg";


const IndexPage = (data: PageProps<data, DataNode>) => {
  return (
    <main style={{  backgroundImage: `url(${ImageBackground})`, backgroundRepeat: "no-repeat",backgroundAttachment: "fixed"}}>
      <NavBar></NavBar>
      <Head title="All Desi Wear - All your desi wear needs are available here"></Head>
      <div className="container my-4">
        <div className="row row-cols-1 row-cols-md-3 g-4">
          <div className="col">
            <div className="card">
            <a href="/mirraw" style={{display:"inherit"}}> <img
                style={{ height: "200px", width: "100%" }}
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
                style={{ height: "200px", width: "100%" }}
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
                style={{ height: "200px", width: "100%" }}
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
             <Card
                Name={item.Name}
                Image={item.Image}
                AffiliateLink={item.AffiliateLink}
                Url={item.Url}
                Category={item.Category}
                CategoryUrl={item.CategoryUrl}
                Brand={item.Brand}
                BrandUrl={item.BrandUrl}
              ></Card>            </div>
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
        ...Product
      }
    }
  }
`;

export default IndexPage;
