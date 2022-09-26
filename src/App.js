//import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';






function App() {
  const [coin, setCoin] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(8); 
  const url = 'https://min-api.cryptocompare.com/data/v2/histoday?fsym=BTC&tsym=USD&limit=100&api_key=8ae55d463e1bf8d38b4a502ca47512f9b1dec21533ad9af7acb993e8ba952bc2'

  const fetchCoin = async () => {
    const { data } = await axios.get(url);

    setCoin(data);
  };
  useEffect(() => {
    fetchCoin();
  }, []);


  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = coin.slice(firstPostIndex, lastPostIndex);

  const Pagination = ({
    totalPosts,
    postsPerPage,
    setCurrentPage,
    currentPage,
}) => {
    const pages = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pages.push(i);
    }

    return (
        <div className='pagination'>
            {pages.map((page, index) => {
                return (
                    <button
                        key={index}
                        onClick={() => setCurrentPage(page)}
                        className={page === currentPage ? "active" : ""}>
                        {page}
                    </button>
                );
            })}
        </div>
    );
};


  return (

    <><div>Page</div><div className="time">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Time</th>
            <th>High</th>
            <th>Low</th>
            <th>Open</th>
            <th>Volumefrom</th>
            <th>Volumeto</th>
            <th>Close</th>
            <th>ConversionType</th>
            <th>ConverisonSymbol</th>
          </tr>
          </thead>
          <tbody>
          {coin && coin.Data.Data.map((coin) => (
            <tr>
              <td>{coin.time}</td>
              <td> {coin.high}</td>
              <td>{coin.low}</td>
              <td>{coin.open}</td>
              <td>{coin.close}</td>
              <td>{coin.volumefrom}</td>
              <td>{coin.volumeto}</td>
              <td>{coin.close}</td>
              <td>{coin.conversionType}</td>
              <td>{coin.conversionSymbol}</td>
            </tr>
          ))}
    
          </tbody>
      </Table>

      <Pagination
                totalPosts={coin.length}
                postsPerPage={postsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
            />
        </div>
    </>
  );
}

export default App;

