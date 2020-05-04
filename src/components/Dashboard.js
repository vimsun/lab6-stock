import React from 'react'
import StocksList from "./StockList.js";
import StocksManagement from "./StockManagment.js";

import { Modal, Button } from "react-bootstrap";

const stocksUrl = 'ws://stocks.mnet.website/';

function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {props.selectedStockName != null ? props.selectedStockName.toUpperCase() : null}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <StocksManagement
            stocks={props.stocks}
            selectedStockName={props.selectedStockName}
            user={props.user}
        />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  



class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stocks: {},
            selectedStockName: null,
            connectionError: false,
            user: JSON.parse(sessionStorage.getItem('user')),
            email: "",
            showModal: false
        };
    }

    componentDidMount = () => {
        this.connection = new WebSocket(stocksUrl);
        this.connection.onmessage = this.saveNewStockValues;
        this.connection.onclose = () => { this.setState({connectionError: true}) }
    };

    saveNewStockValues = (event) => {
        let result = JSON.parse(event.data);
        console.log(result)
        let [up_values_count, down_values_count] = [0, 0];

        let current_time = Date.now();
        let new_stocks = this.state.stocks
        result.map((stock) => {
            if(this.state.stocks[stock[0]]) {
            new_stocks[stock[0]].current_value > Number(stock[1]) ? up_values_count++ : down_values_count++;

            new_stocks[stock[0]].current_value = Number(stock[1])
            new_stocks[stock[0]].history.push({time: current_time, value: Number(stock[1])})
            }
            else  {
                new_stocks[stock[0]] = { current_value: stock[1], history: [{time: Date.now(), value: Number(stock[1])}], is_selected: false }
            }
        });
        this.setState({ stocks: new_stocks });
    }

    toggleStockSelection = (stock_name) => {
        this.setState({ showModal: true})
        let new_stocks = this.state.stocks;
        Object.keys(this.state.stocks).map((stock_name, index) => {
            new_stocks[stock_name].is_selected = false;
        });
        new_stocks[stock_name].is_selected = !new_stocks[stock_name].is_selected;
        this.setState({ stocks: new_stocks, selectedStockName:  stock_name})
    }

    resetData = () => {
        let new_stocks = this.state.stocks;
        Object.keys(this.state.stocks).map((stock_name, index) => {
            new_stocks[stock_name].history = [new_stocks[stock_name].history.pop()];
        });
        this.setState({ stocks: new_stocks });
    }

    areStocksLoaded = () => {
        return Object.keys(this.state.stocks).length > 0;
    }

    render() {
        return (
            <div className='container'>
                    <div>
                        <div className='columns'>
                            <StocksList
                                stocks={this.state.stocks}
                                toggleStockSelection={this.toggleStockSelection}
                                resetData={this.resetData}
                                areStocksLoaded={this.areStocksLoaded}
                            />
                             <MyVerticallyCenteredModal 
                                stocks={this.state.stocks}
                                selectedStockName={this.state.selectedStockName}
                                user={this.state.user}
                                show={this.state.showModal} 
                                onHide={() => this.setState({ showModal: false})}
                            />
                            
                        </div>
                    </div>
            </div>
        );
    }
}

export default Dashboard;