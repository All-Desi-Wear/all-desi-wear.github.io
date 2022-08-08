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
            <Formik
              initialValues={{ query: window.location.search }}
              onSubmit={(values, { setSubmitting }) => {
                setQuery(values.query);
                setSubmitting(false);
              }}
            >
              <Form>
                <Field name="query" />
              </Form>
            </Formik>
            <h1>Results</h1>
            <ul>
              {results.map((result) => (
                <li key={result.Id}>
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
