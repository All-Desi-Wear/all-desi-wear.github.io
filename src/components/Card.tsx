import * as React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { DataNode } from "../models/Types";

const Card = (props: DataNode) => {
  return (
    <div className="card">
      <LazyLoadImage
       src={props.Image}
       alt={props.Name}
       style={{ height: "200px" }}
       className="rounded mx-auto d-block-fluid"
      />
      <div className="card-body">
      <a href={props.CategoryUrl} className="card-link">{props.Category}</a>
      <a href={props.BrandUrl} className="card-link">{props.Brand}</a>
      
        <h5 className="card-title">{props.Name}</h5>
      </div>
      <div className="card-footer text-muted">
        <a target="_blank" className="btn btn-primary" href={props.AffiliateLink}>
          Buy Product
        </a>
        <a className="btn btn-secondary float-end" href={props.Url}>
          View Product
        </a>
      </div>
    </div>
  );
};

export default Card;
