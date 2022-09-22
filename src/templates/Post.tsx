import * as React from "react";
import { PageProps } from "gatsby";
import NavBar from "../components/NavBar";
import { DataNode } from "../models/Types";
import Head from "../components/Head";
import { LazyLoadImage } from "react-lazy-load-image-component";

const IndexRoute = (data: PageProps<DataNode, DataNode>) => {
  return (
    <main>
      <NavBar></NavBar>
      <Head title={data.pageContext.Name}></Head>

      <div className="container my-4">
        <div className="row">
          <div className="col">
            <div className="card">
              <div className="card-body">
                <LazyLoadImage
                  src={data.pageContext.Image}
                  style={{ maxHeight: "200px" }}
                  className="rounded mx-auto d-block-fluid"
                />
              </div>
            </div>
          </div>
          <div className="col">
            <h1>{data.pageContext.Name}</h1>
            <a href={data.pageContext.BrandUrl}>{data.pageContext.Brand}</a>
            <div
              dangerouslySetInnerHTML={{ __html: data.pageContext.Description }}
            ></div>
            <p className="fs-2 text">{data.pageContext.Price}</p>
            <a
              className="btn btn-primary"
              href={data.pageContext.AffiliateLink}
              target="_blank"
            >
              Buy Product
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};
export default IndexRoute;
