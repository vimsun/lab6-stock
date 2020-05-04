import React from 'react'
import StockRow from './StockRow.js'

const StocksList = (props) => {
  return (
    <div className='card column is-one-third' id='stocks_list'>
      <div className='card-header'>
        <div className='card-header-title'>
          <div className='card-header-title' style={{textAlign: "end", display: "block"}} >
            <button className='button is-small' onClick={props.resetData}>Clear history</button>
          </div>
        </div>
      </div>
      <div className='card-content'>
        <table className='table is-bordered'>
          <thead>
            <tr>
                <th>Name</th>
                <th>
                    Price
                </th>
              <th>History</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(props.stocks).map((stock_name, index) =>{
                let current_stock = props.stocks[stock_name];
                return (
                  <StockRow
                    key={index} stock_name={stock_name}
                    stock_data={current_stock}
                    toggleStockSelection={props.toggleStockSelection}
                  />
                )}
            )}
            { props.areStocksLoaded() ? null : <tr><td colSpan='4'>No stocks loaded yet!</td></tr> }
          </tbody>
        </table>
       </div>
    </div>
  );
}

export default StocksList;