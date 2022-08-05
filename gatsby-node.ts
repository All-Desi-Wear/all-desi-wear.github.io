import type { GatsbyNode } from "gatsby"
import * as path from "path"
import UrlCleaner from "./src/helpers/SideshowUrlCleaner"
import ProductLinkGenerator from "./src/helpers/ProductLinkGenerator"
import ImageHelper from "./src/helpers/ImageHelper"
import { SideshowData } from "./src/models/Types"
import config from "./gatsby-config"

const urlCleaner = new UrlCleaner();
const productLinkGenerator = new ProductLinkGenerator();
const imageHelper = new ImageHelper();

export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] = async ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type allDataJson implements Node {
            Brand : String
            Description : String
            Images : String
            Link : String
            Name : String
            Price : String
    }
  `
  createTypes(typeDefs)
}

export const createPages: GatsbyNode["createPages"] = async ({ graphql, actions }) => {

  const { createPage } = actions

  const data = await graphql<SideshowData>(`
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
      ` )

  const postTemplate = path.resolve("./src/templates/Post.tsx");
  const brandTemplate = path.resolve("./src/templates/BrandPage.tsx");
  const allPagesTemplate = path.resolve("./src/templates/AllProducts.tsx");
  const sideShowData = data.data?.allDataJson.nodes;
  console.log(data.data);

  var brands = sideShowData.filter((a, i) => sideShowData.findIndex((s) => a.Brand === s.Brand) === i);

  const createBrandsPromise = brands.map((post) => {

    if (post !== undefined) {
      var url = `/${urlCleaner.Clean(post.Brand ?? "default")}`;

      createPage({
        path: url,
        component: brandTemplate,
        context: {
          brand: post.Brand,
        }
      })
    }

  });

  const createPostPromise = sideShowData.map((post) => {
    if (post !== undefined) {
      var brandUrl = `${urlCleaner.Clean(post.Brand ?? "default")}`;
      var url = productLinkGenerator.CreateProductLink(post.Brand, post.Name);

      createPage({
        path: url,
        component: postTemplate,
        context: {
          name: post.Name,
          price: post.Price,
          url: post.Link,
          imageUrl: post.Images !== null ? post.Images[0] : "",
          description: post.Description,
          brand: post.Brand,
          brandUrl: `/${brandUrl}/`,
          // anything else you want to pass to your context
        }
      })
    }
  })

  const posts = data.data?.allDataJson.nodes
  const productsPerPage = Number(config.siteMetadata.productsPerPage)
  const numberOfPages = Math.ceil(posts.length / productsPerPage)
  const allPagesPromise = Array.from({ length: numberOfPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/all-products` : `/all-products/${i + 1}`,
      component: allPagesTemplate,
      context: {
        limit: productsPerPage,
        skip: i * productsPerPage,
        numberOfPages: numberOfPages,
        currentPage: i + 1,
        url: "/all-products"
      },
    })
  })

  await Promise.all([createPostPromise, createBrandsPromise, allPagesPromise])
}