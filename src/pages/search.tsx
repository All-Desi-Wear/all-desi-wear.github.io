import React, { useState } from "react";
import { useFlexSearch } from "react-use-flexsearch";
import { Formik, Form, Field } from "formik";
import { graphql, PageProps } from "gatsby";
import { result } from "../models/Types";
import NavBar from "../components/NavBar";
import Head from "../components/Head";
import { LazyLoadImage } from "react-lazy-load-image-component";

type data = {
  localSearchPages: localSearchPages;
};

type localSearchPages = {
  store: {};
  index: [];
};

const SearchPage = (data: PageProps<data, result>) => {

  const index = data.data.localSearchPages.index;
  const store = data.data.localSearchPages.store;
  const url = new URL(window.location.href); 
  const [query, setQuery] = useState(url.searchParams.get("search") ?? null);
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
          initialValues={{ query: "" }}
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
                value={url.searchParams.get("search") ?? ""}
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
          <div className="col">
            <ul className="list-group">
              {results.map((result) => (
                <li className="list-group-item" key={result.Id}>
                  <LazyLoadImage
                    src={result.Image}
                    height="200px"
                    width="200px"
                  />
                  <a href={result.Url}>{result.Name}</a>
                  <br />
                  <a href={result.Category}>{result.Category}</a>
                </li>
              ))}
            </ul>
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
