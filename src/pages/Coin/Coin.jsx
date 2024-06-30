import React, { useContext, useEffect, useState } from 'react'
import './Coin.css'
import {useParams} from 'react-router-dom'
import { CoinContext } from '../../context/CoinContext';
import LineChart from '../../components/LineChart/LineChart';

const Coin = () => {
  const  {coinId} = useParams();
  const [CoinData, setCoinData] = useState();
  const [HistoricalData, setHistoricalData] = useState();
  const {currency} = useContext(CoinContext);

  const fetchCoinData = async ()=>{
    const options = {
      method: 'GET',
      headers: {accept: 'application/json','x-xg-demo-api-key':
        'CG-B4tZcbwrsB2j9pdQt1Aix8zz'}
    };
    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`,options)
    .then(response => response.json())
    .then(response => setCoinData(response))
    .catch(err => console.error(err));

  }
const fetchHistoricalData = async ()=>{
  const options = {
    method: 'GET',
    headers: {accept: 'application/json','x-xg-demo-api-key':
      'CG-B4tZcbwrsB2j9pdQt1Aix8zz'}
  };
  fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`,options)
  .then(response => response.json())
  .then(response => setHistoricalData(response))
  .catch(err => console.error(err));
}
  useEffect(()=>{
    fetchCoinData();
    fetchHistoricalData();
  },[currency])


 if(CoinData && HistoricalData){
  return (
    <div className='coin'>
      <div className="coin-name">
        <img src={CoinData.image.large} alt=""/>
        <p><b>{CoinData.name} ({CoinData.symbol.toUpperCase()})</b></p>
        </div>
      
     <div className="coin-chart">
      <LineChart HistoricalData={HistoricalData}/>
     </div>

     <div className="coin-info">
     <ul>
        <li>Crypto Market Rank </li>
        <li>{CoinData.market_cap_rank}</li>
      </ul>
      <ul>
        <li>Current Price</li>
        <li>{currency.symbol} {CoinData.market_data.current_price[currency.name].toLocaleString()}</li>
      </ul>
      <ul>
        <li>Market Cap</li>
        <li>{currency.symbol} {CoinData.market_data.market_cap[currency.name].toLocaleString()}</li>
      </ul>
      <ul>
        <li>24 Hour high</li>
        <li>{currency.symbol} {CoinData.market_data.high_24h[currency.name].toLocaleString()}</li>
      </ul>
      <ul>
        <li>24 Hour low</li>
        <li>{currency.symbol} {CoinData.market_data.low_24h[currency.name].toLocaleString()}</li>
      </ul>
     </div>
     </div>
  )
 }
 else{
  return (
    <div className='spinner'>
      <div className="spin">

      </div>
    </div>
  )
 }
}
export default Coin