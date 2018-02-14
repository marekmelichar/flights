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
      data: [],
      isLoadingData: false,
      showLocationsFromList: false,
      locationsFrom: [],
      locationsTo: [],
    }
  }

  handleSearch = e => {
    e.preventDefault()

    this.setState({ isLoadingData: true })

    const {from, to, date} = this.state
    const parsedDate = moment(date).format('DD/MM/YYYY')

    // axios.get(`https://api.skypicker.com/flights?sort=price&asc=1&locale=en-US&flyFrom=${from}&to=${to}&dateFrom=${parsedDate}`)
    axios.get(`https://api.skypicker.com/flights?sort=price&asc=1&locale=en-US&flyFrom=${from}&to=${to}&dateFrom=${parsedDate}&limit=5&offset=0`)
    .then(response => {
      this.setState({
        data: response.data,
        isLoadingData: false
      })
    })
    .catch(error => {
      console.log('this.handleSearch', error);
    })
  }

  renderSearchResults = () => {
    const {data, isLoadingData} = this.state

    if (data.data && data.data.length > 0) {
      return data.data.map((item, i) => {
        return (<li key={`${item}_${i}`} className="result-item">
          <div className="result">
            <div>Price: <strong>{item.price} {data.currency}</strong></div>
            <div>{item.airlines.map((airline, i) => <img key={`${airline}_${i}`} className="logo-airlines" src={`//images.kiwi.com/airlines/32x32/${airline}.png`} srcSet={`//images.kiwi.com/airlines/64x64/${airline}.png 2x`} alt={airline} title={airline} />)} <br/></div>
            <div>Duration: <strong>{item.fly_duration}</strong></div>
            <div>Departure: <strong>{moment(item.dTime).format('DD/MM/YYYY')}</strong></div>
            <div>Arrival: <strong>{moment(item.aTime).format('DD/MM/YYYY')}</strong></div>
            <div>From: <strong>{item.cityFrom}</strong></div>
            <div>To: <strong>{item.cityTo}</strong></div>
          </div>
        </li>)
      })
    }

    if (data.data && data.data.length === 0 && !isLoadingData) {
      return <div>Sorry, we couldn't find any flights for that.</div>
    }
  }

  handleFrom = e => {
    const {from} = this.state

    return this.setState({ from: e.target.value }, () => {
      axios.get(`https://api.skypicker.com/locations/?term=${from}&v=2&locale=en-US`)
      .then(response => {
        if (response.data.locations.length > 0) {
          this.setState({
            locationsFrom: response.data.locations,
            showLocationsFromList: true
          })
        } else {
          this.setState({ showLocationsFromList: false })
        }
      })
      .catch(error => {
        console.log('this.handleFrom', error);
      })
    })
  }

  handleTo = e => {
    const {to} = this.state

    return this.setState({ to: e.target.value }, () => {
      axios.get(`https://api.skypicker.com/locations/?term=${to}&v=2&locale=en-US`)
      .then(response => {
        if (response.data.locations.length > 0) {
          this.setState({
            locationsTo: response.data.locations,
            showLocationsToList: true
          })
        } else {
          this.setState({ showLocationsToList: false })
        }
      })
      .catch(error => {
        console.log('this.handleTo', error);
      })
    })
  }

  render() {
    const {from, to, date, isLoadingData, showLocationsFromList, locationsFrom, showLocationsToList, locationsTo, data} = this.state

    return(
      <div id="search" className="row">
        <div className="row search-form">
          <h1>Search for flights:</h1>
          <form onSubmit={e => this.handleSearch(e)}>
              <div className="column size_25 form-group text-left">
                <label>From:</label>
                <input
                  required={true}
                  type="text"
                  className="form-input-from"
                  id="from"
                  placeholder="From"
                  onChange={e => this.handleFrom(e)}
                  value={from}
                />
                {showLocationsFromList &&
                  <ul className="locations-list">
                    <span className="close" onClick={() => this.setState({ showLocationsFromList: false })}>X</span>
                    {locationsFrom.map((location, i) => {
                      return <li key={`${location.int_id}_${i}`} onClick={() => this.setState({ from: location.name, showLocationsFromList: false })}>{location.name}</li>
                    })}
                  </ul>}
              </div>
              <div className="column size_25 form-group text-left">
                <label>To:</label>
                <input
                  required={true}
                  type="text"
                  className="form-input-to"
                  id="to"
                  placeholder="To"
                  onChange={e => this.handleTo(e)}
                  value={to}
                />
                {showLocationsToList &&
                  <ul className="locations-list">
                    <span className="close" onClick={() => this.setState({ showLocationsToList: false })}>X</span>
                    {locationsTo.map((location, i) => {
                      return <li key={`${location.int_id}_${i}`} onClick={() => this.setState({ to: location.name, showLocationsToList: false })}>{location.name}</li>
                    })}
                  </ul>}
              </div>
              <div className="column size_25 form-group text-left">
                <label>Date:</label>
                <DatePicker
                  selected={date}
                  onChange={date => this.setState({ date })}
                />
              </div>

              <div className="column size_25 form-group text-left">
                <button type="submit" className="confirm-button green">Search</button>
              </div>

            </form>
          </div>

          <div id="results" className="row">
            <ul className="result-list">
              {isLoadingData && <div>Loading flights...</div>}
              {this.renderSearchResults()}
            </ul>
          </div>
      </div>
    )
  }
}

export default App
