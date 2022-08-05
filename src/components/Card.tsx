import * as React from "react";
import { StaticImage } from "gatsby-plugin-image"

type CardProps = {
  name: string;
  thumbnailImageUrl: string;
  productUrl: string;
  url: string;
};

const Card = (props: CardProps) => {
  return (
    <div className="card">
      <StaticImage src={props.thumbnailImageUrl} alt={props.name} style={{ maxHeight: "200px" }}  className="rounded mx-auto d-block-fluid"/>
      <div className="card-body">
        <h5 className="card-title">{props.name}</h5>
      </div>
      <div className="card-footer text-muted">
        <a target="_blank" className="btn btn-primary" href={props.url}>
          Buy Product
        </a>
        <a className="btn btn-secondary float-end" href={props.productUrl}>
          View Product
        </a>
      </div>
    </div>
  );
};

export default Card;
