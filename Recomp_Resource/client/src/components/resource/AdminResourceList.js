import React, { useEffect, useState } from "react";
import { getAllResources, getResourceSearch } from "../../modules/resourceManager";
import { Link } from "react-router-dom";
import AdminResource from "./AdminResource";


const AdminResourceList = () => {
  const [resources, setResources] =  useState([])
  const [searchParams, setSearchParams] = useState("");


 


  const getResources = () => {
    getAllResources().then((data) => setResources(data));
  };

  useEffect(() => {
    getResources();
  }, []);

  const search = () => {
    getResourceSearch(searchParams).then((searchResults) => {
      setResources(searchResults);
      setSearchParams("")
    });
  };

  const sortButtonDate = () => {
        
    const resAsc = [...resources].sort((a, b) =>
    a.dateAdded > b.dateAdded ? 1 : -1,)
    
    setResources(resAsc);

}
const sortButtonMostSaves = () => {
    const resSaves = [...resources].sort((a, b) =>
    a.saves > b.saves ? 1 : -1,)
    
    setResources(resSaves)
}

  return (
    <>
      <div className="container m-4">
        <div className="search-wrapper">
          <button onClick={getResources}>Show All</button>
          <label htmlFor="search-form">
            <input
              type="search"
              name="search-form"
              id="search-form"
              className="searchInput rounded"
              placeholder="DisplayName/Focus..."
              onChange={(event) => {
                setSearchParams(event.target.value);
              }}
            />
         </label>
         <button onClick={search}>Search </button> 
        </div>
        
      </div>
      <h1 className="text-center"> RESOURCES</h1>
      <button onClick = {sortButtonDate}>
      Most Recently Added
      </button>
      <button onClick={sortButtonMostSaves}>
      Most Saves
      </button>
      <button>
      <Link to={"../../resource/create"}>ADD</Link>
      </button>
      
      <section className="container">
        <div className="row justify-content-center">
          {resources.map((resource) => (
            <AdminResource resource={resource} key={resource.id} />
          ))}
        </div>
      </section>
    </>
  );
};

export default AdminResourceList;
