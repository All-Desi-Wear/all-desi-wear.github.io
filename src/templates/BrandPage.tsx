import * as React from "react";
import { PageProps, graphql } from "gatsby";
import NavBar from "../components/NavBar";
import Head from "../components/Head";
import { data, DataNode } from "../models/Types";
import Card from "../components/Card";


const BrandPage = (data: PageProps<data, DataNode>) => {
  return (
    <main>
      <NavBar></NavBar>
      <Head title={data.pageContext.Brand}></Head>

      <div className="container my-4">
        <div className="row">
          <div className="col">
            <h1>{data.pageContext.Brand}</h1>
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
        ...Product
      }
    }
  }
`;

export default BrandPage;
