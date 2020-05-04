import React, { useEffect, useState } from 'react';
import ManagementRow from "./ManagmentRow";

class StocksManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ownedStocks: [],
            user: props.user,
            selectedStockName: props.selectedStockName,
            selectedStockValue: 0,
            modalShow: false,
            stocks: props.stocks
        };
    }

    updateChart = () => {
        Object.keys(this.state.stocks).map((stock_name, index) => {
            this.setState({selectedStockValue: this.state.stocks[this.state.selectedStockName].current_value})
            let current_stock = this.state.stocks[stock_name];
            if(current_stock.is_selected) {
                let current_stock = this.state.stocks[stock_name];
                this.fetchOwnedStock(stock_name);   

            }
        })
    };

    fetchOwnedStock = (name) => {
        fetch('http://localhost:3004/stocks?name=' + name + '&user=' + this.state.user.id)
        .then(response => response.json())
        .then(stocks => {
            if (stocks) {
                this.setState({ownedStocks: stocks})
            }
            else {
                alert("Something went wrong")
            }
        });
    };

    fetchUser = () => {
        fetch('http://localhost:3004/users/' + this.state.user.id)
        .then(response => response.json())
        .then(user => {
            if (user[0]) {
                this.setState({user: user[0]})
            }
            else {
                alert("Something went wrong")
            }
        });
    };

    buyStock = () => {
        let user = this.state.user;

        if (parseFloat(user.money) > parseFloat(this.state.stocks[this.state.selectedStockName].current_value)) {
            user.money = parseFloat(user.money) - parseFloat(this.state.stocks[this.state.selectedStockName].current_value);
            fetch('http://localhost:3004/users/' + user.id, {
                method: 'PUT',
                body: JSON.stringify(user),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function(response) {
                return response.json();
            }).then(function(data) {
                console.log(data)
            });

            let body = {
                name: this.state.selectedStockName,
                price: this.state.stocks[this.state.selectedStockName].current_value,
                user: user.id,
                bought_at: new Date().toLocaleString()
            };
            fetch('http://localhost:3004/stocks', {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(function(response) {
                return response.json();
            })
            .then(() => this.fetchOwnedStock(this.state.selectedStockName));
        }
        else {
            alert("You don't have enough money")
        }
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedStockName !== this.state.selectedStockName){
            this.setState({
                selectedStockName: nextProps.selectedStockName,
                selectedStockValue: nextProps.stocks[nextProps.selectedStockName].current_value
            });
            this.updateChart()
        }
        else if (this.state.selectedStockName && nextProps.stocks[this.state.selectedStockName].current_value !== this.state.selectedStockValue) {
            this.setState({ selectedStockValue: nextProps.stocks[this.state.selectedStockName].current_value });
            this.updateChart()
        }
    }

    getStockValues = (stock) =>{
        return stock.history.map((history) => {
            return {t: new Date(history.time), y: history.value};
        })
    }

    render() {
        return (
            <div className={'card column'} >
                {this.props.selectedStockName !== null 
                ? 
                    <div>
                        <div className='card-header'>
                            <div className='card-header-title'> 
                                {`Balance ${parseFloat(this.state.user.money).toFixed(2)} $`} 
                                <button className="button is-success" onClick={this.buyStock}>Buy</button>
                            </div>
                    </div>
                    <div className='card-content'>
                    {
                        this.state.ownedStocks.length !== 0 
                    ?
                        <table className='table is-bordered' style={{width: "100%"}}>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Bought At</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.ownedStocks.map(stock => {
                                    return (
                                    <ManagementRow
                                        stock={stock}
                                        user={this.state.user}
                                        selectedStockName={this.state.selectedStockName}
                                        stocks={this.state.stocks}
                                        fetchUser={this.fetchUser}
                                        fetchOwnedStock={() => this.fetchOwnedStock(this.state.selectedStockName)}
                                    />
                                    )   
                                })
                            }
                            </tbody>
                        </table>
                    :
                        <p style={{textAlign: "center", marginTop: "15px"}} >You haven't bought this stock yet</p>
                    }
                    </div>
                </div>
            :
                <p id="error" style={{textAlign: "center", marginTop: "15px"}} >Select a Stock to manage</p>
            }
            </div>
        );
    }
}

export default StocksManagement;