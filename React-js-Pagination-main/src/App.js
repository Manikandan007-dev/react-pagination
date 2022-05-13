import "./App.css";

import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";

function App() {
  const [items, setItems] = useState([]);

  const [pageCount, setpageCount] = useState(0);

  let limit = 10;

  useEffect(() => {
    const getComments = async () => {
      const res = await fetch(
        `https://api.punkapi.com/v2/beers?page=1&per_page=10`
      );
      const data = await res.json();
      console.log(data);
      const total = res.headers.get("x-total-count");
      console.log(total)
      setpageCount(Math.ceil(total / limit));
      setItems(data);
    };

    getComments();
  }, [limit]);

  const fetchComments = async (currentPage) => {
    const res = await fetch(
      `https://api.punkapi.com/v2/beers?page=${currentPage}&per_page=${limit}`
    );
    const data = await res.json();
    console.log("data",data)
    return data;
  };

  const handlePageClick = async (data) => {
    console.log(data.selected);

    let currentPage = data.selected + 1;

    const commentsFormServer = await fetchComments(currentPage);

    setItems(commentsFormServer);
    
  };
  return (
    <div className="container">
      <div className="row m-2">
        <table className="table table-hover table-box">
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>TAGLINE</th>
            <th>FIRST BREAWED</th>
            <th>DESCRIPTION</th>
          </tr>
          </thead>
        <tbody>
        {items && items.map((field, i) => {
                  return(
                    
                    <tr key={field.i}>
                    <td>{field.id}</td>
                    <td>{field.name}</td>
                    <td>{field.tagline}</td>
                    <td>{field.first_brewed}</td>
                    <td>{field.description}</td>
                    </tr>
                  )
                })}
        </tbody>

        </table>
       
      </div>

      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        pageCount={35}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    </div>
  );
}

export default App;
