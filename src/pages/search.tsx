import React, { useState } from "react";
import { useFlexSearch } from "react-use-flexsearch";
import { Formik, Form, Field } from "formik";
import { graphql, PageProps } from "gatsby";
import { allDataJson, result } from "../models/Types";
import NavBar from "../components/NavBar";
import Head from "../components/Head";

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

  const [query, setQuery] = useState(null);
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
              <label for="search" className="visually-hidden">Search</label>
              <input type="text" readonly class="form-control-plaintext" id="search" value="Enter Search Terms" />
            </div>
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
          <div className="col">
            <ul className="list-group">
              {results.map((result) => (
                <li className="list-group-item" key={result.Id}>
                  <a href={result.Url}>{result.Name}</a>
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
