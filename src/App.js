import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      from: '',
      to: '',
      date: moment()
    }
  }

  handleSearch = e => {
    e.preventDefault()

    const {from, to, date} = this.state

    console.log(from, to, date);
  }

  handleDate = e => {
    e.preventDefault()

  }

  render() {
    const {from, to, date} = this.state

    return(
      <div className="row">
        <form onSubmit={e => this.handleSearch(e)}>
            <div className="column size_25 form-group text-center">
              <input
                type="text"
                className="form-input-from"
                id="from"
                placeholder="From"
                onChange={e => this.setState({ from: e.target.value })}
                value={from}
              />
            </div>
            <div className="column size_25 form-group text-center">
              <input
                type="text"
                className="form-input-to"
                id="to"
                placeholder="To"
                onChange={e => this.setState({ to: e.target.value })}
                value={to}
              />
            </div>
            <div className="column size_25 form-group text-center">
              <DatePicker
                selected={date}
                onChange={date => this.setState({ date })}
              />
            </div>

            <div className="column size_25 form-group text-center">
              <button type="submit" className="confirm-button green">Search</button>
            </div>

          </form>
      </div>
    )
  }
}

export default App
