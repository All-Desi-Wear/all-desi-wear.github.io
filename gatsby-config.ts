import type { GatsbyConfig } from "gatsby";

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

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
              Brand
              Description
              Images
              Link
              Name
              Price
            }
          }      
        }
      `,

      // Field used as the reference value for each document.
      // Default: 'id'.
      ref: 'Name',

      // List of keys to index. The values of the keys are taken from the
      // normalizer function below.
      // Default: all fields
      index: ['Brand', 'Description'],

      // List of keys to store and make available in your UI. The values of
      // the keys are taken from the normalizer function below.
      // Default: all fields
      store: ['Brand', 'Name'],

      // Function used to map the result from the GraphQL query. This should
      // return an array of items to index in the form of flat objects
      // containing properties to index. The objects must contain the `ref`
      // field above (default: 'id'). This is required.
      normalizer: ({ data }) =>
        data.allDataJson.nodes.map((node) => ({
          Brand: node.Brand,
          Name: node.Name,
          Description: node.Description,
        })),
    },
  },
]
};

export default config;
