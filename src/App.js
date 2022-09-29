//import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import AnimatedPage from '/Users/idabrudesethdyrseth/coin-react-app/src/components/AnimatedPage.js';
import Moment from 'react-moment';





function App() {
  const [coin, setCoin] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(20);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = coin.slice(firstPostIndex, lastPostIndex); 
  const url = 'https://min-api.cryptocompare.com/data/v2/histoday?fsym=BTC&tsym=USD&limit=100&api_key=8ae55d463e1bf8d38b4a502ca47512f9b1dec21533ad9af7acb993e8ba952bc2'




  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };




  const pages = [];
  for (let i = 1; i <= Math.ceil(coin.length / postsPerPage); i++) {
    pages.push(i);
  }

  const renderPageNumbers = pages.map(number => { // map through pages array and return a button for each page
    return (
      <li
        key={number}
        id={number}
        onClick={handleClick}
      >
        {number}
      </li>
    );
  });



  useEffect(() => {
    console.log("usEffect2")
    const fetchData2 = async () => {
      const result2 = await axios.get(url); // get all coins
      const list = result2.data.Data.Data.reverse()
      setCoin(list); // set coins to the data returned from the api
      console.log(result2.data); // set coins to the data returned from the api
    };
    fetchData2(); // call the function
  }, []);

  return (
  
    <AnimatedPage>
      <div className="container2">
          <Table className="coinTable" striped bordered hover>
          <div className="tableBox">
            <thead className="tableHead">
              <tr>
                <th>Date</th>
                <th onClick={() => console.log("Sorting function")}>
                  Open value ($)
                </th>
                <th>Time</th>
                <th>High</th>
                <th>Low</th>
                <th>Close</th>
                <th>Volume</th>
                <th>conversionType</th>
              </tr>
            </thead>
            <tbody>
              {coin.length ? (
                currentPosts.map((coin) => {
                  return (
                    //coin && coin.Data.Data.map((coin) => (
                    <tr key={coin.time}>
                      <td><Moment unix format="LL">{coin.time}</Moment></td>
                      <td>{coin.low}</td>
                      <td>{coin.open}</td>
                      <td>{coin.close}</td>
                      <td>{coin.volumefrom}</td>
                      <td>{coin.volumeto}</td>
                      <td>{coin.close}</td>
                      <td>{coin.conversionType}</td>
                      <td>{coin.conversionSymbol}</td>
                    </tr>
                  )
                })
              ) : (
                <></>
              )}
            </tbody>
            </div>
        </Table>
          <div className = "pageBox">
        <AnimatedPage>
          <ul className="pageNumbers">
            {renderPageNumbers}
          </ul>
        </AnimatedPage>
        </div>
      </div >
    </AnimatedPage >
              
      
  )
}


export default App;

