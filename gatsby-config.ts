import type { GatsbyConfig } from "gatsby";
import ProductLinkGenerator from "./src/helpers/ProductLinkGenerator"

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

const productLinkGenerator = new ProductLinkGenerator();
const config: GatsbyConfig = {
  siteMetadata: {
    title: ``,
    siteUrl: `https://www.yourdomain.tld`,
    productsPerPage: Number(process.env.PRODUCTS_PER_PAGE)
  },
  plugins: ["gatsby-plugin-image","gatsby-plugin-sharp",  "gatsby-transformer-sharp", "gatsby-plugin-react-helmet", "gatsby-plugin-sitemap", {
    resolve: 'gatsby-plugin-manifest',
    options: {
      "icon": "src/images/icon.png"
    }
  },
  `gatsby-transformer-json`,
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      path: `./src/data/`,
    },
  },
  {
    resolve: 'gatsby-plugin-local-search',
    options: {
      // A unique name for the search index. This should be descriptive of
      // what the index contains. This is required.
      name: 'pages',

      // Set the search engine to create the index. This is required.
      // The following engines are supported: flexsearch, lunr
      engine: 'flexsearch',

      // Provide options to the engine. This is optional and only recommended
      // for advanced users.
      //
      // Note: Only the flexsearch engine supports options.
      engineOptions: 'speed',

      // GraphQL query used to fetch all data for the search index. This is
      // required.
      query: `
        {
          allDataJson {
            nodes {
              Id
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
      `,

      // Field used as the reference value for each document.
      // Default: 'id'.
      ref: 'Id',

      // List of keys to index. The values of the keys are taken from the
      // normalizer function below.
      // Default: all fields
      index: ['Brand','Name', 'Description', 'Category'],

      // List of keys to store and make available in your UI. The values of
      // the keys are taken from the normalizer function below.
      // Default: all fields
      store: ['Id','Brand', 'Name', 'Description', 'Url', 'Image', 'Category'],

      // Function used to map the result from the GraphQL query. This should
      // return an array of items to index in the form of flat objects
      // containing properties Imagesto index. The objects must contain the `ref`
      // field above (default: 'id'). This is required.
      normalizer: ({ data }) =>
        data.allDataJson.nodes.map((node) => ({
          Id: node.Id,
          Brand: node.Brand,
          Name: node.Name,
          Description: node.Description,
          Url: productLinkGenerator.CreateProductLink(node.Brand, node.Name),
          Image: node.Image,
          Category: node.Category
        })),
    },
  },
]
};

export default config;
