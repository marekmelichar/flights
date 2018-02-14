import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment';
import axios from 'axios'

import 'react-datepicker/dist/react-datepicker.css';

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      from: '',
      to: '',
      date: moment(),
      data: []
    }
  }

  handleSearch = e => {
    e.preventDefault()

    const {from, to, date} = this.state
    const parsedDate = moment(date).format('DD/MM/YYYY')

    // axios.get(`https://api.skypicker.com/flights?sort=price&asc=1&locale=en-US&flyFrom=${from}&to=${to}&dateFrom=${parsedDate}`)
    axios.get(`https://api.skypicker.com/flights?sort=price&asc=1&locale=en-US&flyFrom=${from}&to=${to}&dateFrom=${parsedDate}&limit=20&offset=0`)
    .then(response => {
      this.setState({ data: response.data })
    })
    .catch(error => {
      console.log(error);
    })
  }

  renderSearchResults = () => {
    const {data} = this.state

    console.log(data);

    if (data.data) {
      return data.data.map((item, i) => {
        return (<li key={`${item}_${i}`}>
          {item.price} {data.currency} <br/>
          airline: {item.airlines.map(airline => airline)} <br/>
          duration: {item.fly_duration} <br/>
          departure: {moment(item.dTime).format('DD/MM/YYYY')} <br/>
          arrival: {moment(item.aTime).format('DD/MM/YYYY')} <br/>
          from: {item.cityFrom} <br/>
          to: {item.cityTo}
        </li>)
      })
    }
  }

  render() {
    const {from, to, date} = this.state


    return(
      <div className="row search">
        <form onSubmit={e => this.handleSearch(e)}>
            <div className="column size_25 form-group text-center">
              <input
                required={true}
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
                required={true}
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

          <div id="results" className="row">
            <ul>{this.renderSearchResults()}</ul>
          </div>
      </div>
    )
  }
}

export default App
