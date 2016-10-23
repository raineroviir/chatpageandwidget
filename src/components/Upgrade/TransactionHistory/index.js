import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { styles } from './styles.scss';
import { Link } from 'react-router';
import * as THActions from '../../../actions/TransactionHistory';
import moment from 'moment';



export class TransactionHistory extends Component {
    constructor( props ) {
      super( props );
      this.state = {
        errorMsg: '',
        transactions: [],
        status: ''
      }
    }

    componentDidMount() {
      this.setState({
        status:'loading'
      });
      this.props.thActions.getTransactionHistory(3, ( status, res ) => {
        let obj = {
          status : 'loaded',
          errorMsg: ''
        };
        if( status === 'error' ) {
          //obj.errorMsg = res.error;
          obj.status = 'error';
        } else {
          obj.transactions = res.transactions || [];
          if( obj.transactions.length === 0 ) {
            obj.errorMsg = "No transactions Available";
          }
        }
        this.setState(obj);
      });
    }


    componentWillMount() {
    }

    render(){
        return (
            <div className="transaction-history">
                <div className="ovel-close-wrapper">
                  <Link to="/settings/billing-payment" className="ovel-close" ></Link>
                </div>
                <h1 className="upgrade-title">
                  Transaction history
                </h1>
                <div className="transaction-table-wrapper">
                  {
                    this.state.errorMsg ?
                    <div className="common-error-message">
                      {this.state.errorMsg}
                    </div>
                    :
                    <table className="transaction-table">
                      <thead>
                        <tr>
                          <th>Date & Time</th>
                          <th>Amount</th>
                        </tr>
                      </thead>

                      <tbody>
                        {
                          this.state.transactions.map((item,index) => {
                            return (<tr>
                              <td>{moment(item.created_at).format("L")} {moment(item.created_at).format("LT")}</td>
                              <td>${item.amount}</td>
                            </tr>)
                          })
                        }
                                                
                      </tbody>
                    </table>
                  }
                </div>
                
                
            </div>
        );
    }
}



function mapStateToProps(state) {
  return {
    userinfo: state.userinfo
  }
}


function mapDispatchToProps(dispatch) {
  return {
    thActions: bindActionCreators( THActions, dispatch )
  }
}

export default connect(
  mapStateToProps,mapDispatchToProps
)(TransactionHistory)