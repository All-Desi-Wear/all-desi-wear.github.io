import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { graphql, PageProps, useStaticQuery } from "gatsby";
import NavBar from "../components/NavBar";
import Head from "../components/Head";
import Card from "../components/Card";
import { DataNode } from "../models/Types";
import { useFlexSearch } from "react-use-flexsearch";

type data = {
  localSearchPages: localSearchPages;
};

type localSearchPages = {
  store: {};
  index: [];
};

const SearchPage = (data: PageProps<data, DataNode>) => {
  var searchParams = null;

  const index = data.data.localSearchPages.index;
  const store = data.data.localSearchPages.store;

  if (typeof window !== "undefined") {
    const url = new URL(window?.location?.href);
    searchParams = url.searchParams.get("search") ?? "";
  }

   

  
  const [query, setQuery] = useState(searchParams);
  const searchResults = useFlexSearch(query, index, store);
  const Categories = [...new Set(searchResults.map(item => item.Category))] as Array<string>;
  const [filteredResults, setFilteredResults] = useState(null);
  const [groupedResults, setGroupedResults] = useState(null)

  // Function to filter the results by category
  const filterByCategory = (category: string) => {
    var subset = searchResults.filter((result: DataNode) => result.Category === category);
    setFilteredResults(subset);
    setGroupedResults(null)
    console.log(subset);
  };

  // Function to group the results by category
  const groupByCategory = () => {
    const groupedResults = searchResults.reduce((acc: any, curr: DataNode) => {
      if (!acc[curr.Category]) {
        acc[curr.Category] = [];
      }
      acc[curr.Category].push(curr);
      return acc;
    }, {});
    console.log(groupedResults);
    setFilteredResults(null);
    setGroupedResults(groupedResults)
  };

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
            {searchResults && (
              <>
               {Categories.map((result: string, i: number) => (
                <button onClick={() => filterByCategory(result)}>
                {result}
                </button>

               
               ))
              }
               
                <button onClick={groupByCategory}>Group by category</button>
                {groupedResults && (
                  <>
                    {Object.entries(groupedResults).map(([category, results]) => (
                        
                        <>
                          <h3>{category}</h3>
                          <ul>
                            <>
                              {results.map((result: DataNode, i: number) => (
                                <li key={i}>
                                  <h4>{result.Name}</h4>
                                  <p>{result.Name}</p>
                                </li>
                              ))}
                            </>
                          </ul>
                        </>
                      )
                    )}
                  </>
                )}
                {filteredResults && (
                    <ul>
                    {filteredResults.map((result : DataNode, i : number) => (
                      <li key={i}>
                        <h3>{result.Name}</h3>
                        {result.Category && <p>Category: {result.Category}</p>}
                      </li>
                    ))}
                  </ul>
                )} 
                {(!filteredResults && !groupedResults) && (
                  <>
                    {searchResults.map((item: DataNode) => (
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
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export const querySearch = graphql`
  {
    localSearchPages {
      store
      index
    }
  }
`;

export default SearchPage;
