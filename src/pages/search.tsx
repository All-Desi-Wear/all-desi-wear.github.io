import React, { useState } from "react";
import { useFlexSearch } from "react-use-flexsearch";
import { Formik, Form, Field } from "formik";
import { graphql, PageProps } from "gatsby";
import NavBar from "../components/NavBar";
import Head from "../components/Head";
import Card from "../components/Card";
import { DataNode } from "../models/Types";

type data = {
  localSearchPages: localSearchPages;
};

type localSearchPages = {
  store: {};
  index: [];
};

const SearchPage = (data: PageProps<data, DataNode>) => {
  const index = data.data.localSearchPages.index;
  const store = data.data.localSearchPages.store;
  var searchParams = null;

  if (typeof window !== "undefined") {
    const url = new URL(window?.location?.href);
    searchParams = url.searchParams.get("search") ?? "";
  }

  const [query, setQuery] = useState(searchParams);
  const results = useFlexSearch(query, index, store);

  return (
    <main>
      <NavBar></NavBar>
      <Head title="Search Results"></Head>

      <div className="container my-4">
        <div className="row">
          <div className="col">
            <h1>Results</h1>
          </div>
        </div>

        <Formik
          initialValues={{ query: searchParams }}
          onSubmit={(values, { setSubmitting }) => {
            setQuery(values.query);
            setSubmitting(false);
          }}
        >
          <Form className="row">
            <div className="col-auto">
              <Field
                name="query"
                placeholder="Enter your search"
                className="form-control"
              />
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary mb-3">
                Submit
              </button>
            </div>
          </Form>
        </Formik>

        <div className="row">
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {results.map((item: DataNode) => (
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
                ></Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export const query = graphql`
  {
    localSearchPages {
      store
      index
    }
  }
`;

export default SearchPage;
