import type { GatsbyNode } from "gatsby"
import * as path from "path"
import { data } from "./src/models/Types"
import config from "./gatsby-config"

export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] = async ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type allDataJson implements Node {
            Brand : String
            BrandUrl : String
            Description : String
            Image : String
            AffiliateLink : String
            Name : String
            Price : String
            Category : String
            CategoryUrl : String
            Url : String
    }
  `
  createTypes(typeDefs)
}

export const createPages: GatsbyNode["createPages"] = async ({ graphql, actions }) => {

  const { createPage } = actions

  const data = await graphql<data>(`
    {
        allDataJson {
          nodes {
            Brand
            BrandUrl
            Description
            Image
            AffiliateLink
            Name
            Price
            Category
            CategoryUrl
            Url
          }
        }
      }      
      ` )

  const postTemplate = path.resolve("./src/templates/Post.tsx");
  const brandTemplate = path.resolve("./src/templates/BrandPage.tsx");
  const categoryTemplate = path.resolve("./src/templates/Category.tsx");
  const allPagesTemplate = path.resolve("./src/templates/AllProducts.tsx");
  const sideShowData = data.data?.allDataJson.nodes;

  var brands = sideShowData.filter((a, i) => sideShowData.findIndex((s) => a.Brand === s.Brand) === i);

  const createBrandsPromise = brands.map((post) => {

    if (post !== undefined) {
      createPage({
        path: post.BrandUrl,
        component: brandTemplate,
        context: {
          Brand: post.Brand,
        }
      })
    }

  });
  var categories = sideShowData.filter((a, i) => sideShowData.findIndex((s) => a.Category === s.Category) === i);

  const createCategoriesPromise = categories.map((post) => {

    if (post !== undefined) {
      createPage({
        path: post.CategoryUrl,
        component: categoryTemplate,
        context: {
          Category: post.Category,
        }
      })
    }

  });

  const createPostPromise = sideShowData.map((post) => {
    if (post !== undefined) {

      createPage({
        path: post.Url,
        component: postTemplate,
        context: {
          Name: post.Name,
          Price: post.Price,
          AffiliateLink: post.AffiliateLink,
          Image: post.Image,
          Description: post.Description,
          Brand: post.Brand,
          BrandUrl: post.BrandUrl,
          Category: post.Category,
          CategoryUrl: post.CategoryUrl,
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

  await Promise.all([createCategoriesPromise,createPostPromise, createBrandsPromise, allPagesPromise])
}