import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom";
import "../style/PageCarsList.css"
import { SERVER_ADDRESS } from 'constants';


import { fetchCars, onChange, saveNewCar, carAdded, sortCars, setCarId } from '../redux/actions'

class PageCarsList extends React.Component {

  constructor(props) {
    super(props);
    this.onEditClick = this.onEditClick.bind(this);
    this.onAddClick = this.onAddClick.bind(this);
    this.onCancelClick = this.onCancelClick.bind(this);
    this.onShowAvailabilityClick = this.onShowAvailabilityClick.bind(this);

    this.onChange_registration_number = this.onChange_registration_number.bind(this);
    this.onChange_brand = this.onChange_brand.bind(this);
    this.onChange_model = this.onChange_model.bind(this);
    this.onChange_location = this.onChange_location.bind(this);
    this.onChange_renting_company = this.onChange_renting_company.bind(this);

    this.onChange_price = this.onChange_price.bind(this);
    this.onChange_year_of_production = this.onChange_year_of_production.bind(this);

    this.onSaveNewClick = this.onSaveNewClick.bind(this);
    this.onSaveChangedClick = this.onSaveChangedClick.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.onChange_search = this.onChange_search.bind(this);

    this.onSortClick = this.onSortClick.bind(this);

    this.state = {
      editmode: null,
      id: '',
      registration_number: '',
      brand: '',
      model: '',
      location: '',
      renting_company: '',
      price: '',
      year_of_production: '',

      isSaving: false,
      error: null,
      nofetch: false,
      search: '',
      //   sortBy:null,
      //   cars:[]
    }

  }

  componentWillMount() {
    this.setState({ editmode: -2 });
    this.props.fetchCars();
    //  this.setState({cars:this.props.cars})

  }
  //componentDidUpdate(){    this.setState({cars:this.props.cars})  }
  onEditClick(i) {
    this.setState({
      id: this.props.cars[i].id,
      registration_number: this.props.cars[i].registration_number,
      brand: this.props.cars[i].brand,
      model: this.props.cars[i].model,
      location: this.props.cars[i].location,
      renting_company: this.props.cars[i].renting_company,
      price: this.props.cars[i].price,
      year_of_production: this.props.cars[i].year_of_production
    })

    this.setState({ editmode: i });
  }
  onShowAvailabilityClick(i) {
    this.props.setCarId(this.props.cars[i].id)
    this.props.history.push("/calendar");
  }

  onAddClick() {
    this.setState({
      id: Date.now(),
      registration_number: '',
      brand: '',
      model: '',
      location: '',
      renting_company: '',
      price: 0,
      year_of_production: 2020
    });

    this.setState({ editmode: -1 });
  }
  onCancelClick() {
    this.setState({ editmode: -2 });
  }

  onSaveNewClick() {
    const car = {
      id: this.state.id,
      registration_number: this.state.registration_number,
      brand: this.state.brand,
      model: this.state.model,
      location: this.state.location,
      renting_company: this.state.renting_company,
      price: this.state.price,
      year_of_production: this.state.year_of_production
    };
    if (!this.state.isSaving) {
      fetch(`${SERVER_ADDRESS}/cars`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(car)
      })
        .then(res => {
          if (res.status !== 201) {
            this.setState({ editmode: -2 });
            this.setState({ isSaving: false, error: `Saving returned status ${res.status}` });
          } else {
            this.setState({ editmode: -2 });
            window.location.reload(false);
            this.props.carAdded();
            this.setState({ isSaving: false });
          }
        })
    }
  }
  onSaveChangedClick() {
    const car = {
      id: this.state.id,
      registration_number: this.state.registration_number,
      brand: this.state.brand,
      model: this.state.model,
      location: this.state.location,
      renting_company: this.state.renting_company,
      price: this.state.price,
      year_of_production: this.state.year_of_production
    };
    if (!this.state.isSaving) {
      //    this.setState({isSaving:true});
      fetch(`${SERVER_ADDRESS}/cars` + this.state.id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(car)
      })
        .then((response) => {
          response.json().then((response) => {
            console.log(response);
            this.setState({ isSaving: false });
            window.location.reload(false);
          })
        }).catch(err => {
          console.error(err);
          this.setState({ isSaving: false });
          window.location.reload(false);
        })

    }

  }
  onDeleteClick() {
    if (!this.state.isSaving) {
      this.setState({ isSaving: true });
      fetch(`${SERVER_ADDRESS}/cars/` + this.state.id, {
        method: 'DELETE'
      }).then(() => {
        window.location.reload(false);
        this.setState({ editmode: -2 });
        console.log('removed');
        this.setState({ isSaving: false });

      }).catch(err => {
        console.error(err);
        this.setState({ editmode: -2 });
        this.setState({ isSaving: false });
      });
    }
  }

  onChange_registration_number(e) {
    this.setState({ registration_number: e.target.value });
  }
  onChange_brand(e) {
    this.setState({ brand: e.target.value });
  }
  onChange_model(e) {
    this.setState({ model: e.target.value });
  }
  onChange_location(e) {
    this.setState({ location: e.target.value });
  }
  onChange_renting_company(e) {
    this.setState({ renting_company: e.target.value });
  }
  onChange_price(e) {
    this.setState({ price: Number(e.target.value) });
  }
  onChange_year_of_production(e) {
    this.setState({ year_of_production: Number(e.target.value) });
  }
  onChange_search(e) {
    this.setState({ search: e.target.valueh });
  }
  onSortClick(sort_string) {
    //switch(sort_string){  case "registration_number":{
    const sortedcars = this.props.cars.sort((a, b) => a.registration_number.localeCompare(b.registration_number));
    this.props.sortCars(sortedcars);
    //}
    // }
  }

  render() {

    if (this.state.isSaving) { return <p>Saving ...</p> }
    if (this.props.loading) { return <p>Loading ...</p> }

    return (
      <div>

        <div className="header">Cars List</div>
        <div id="listHeader">
          <button onClick={() => this.onSortClick("registration_number")}>Registration number</button>
          <button onClick={() => this.props.onSortClick("brand")}>Brand</button>
          <button onClick={() => this.props.onSortClick("model")}>Model</button>
          <button onClick={() => this.props.onSortClick("location")}>Location</button>
          <button onClick={() => this.props.onSortClick("renting_company")}>Renting Company</button>
          <button onClick={() => this.props.onSortClick("price")}>Price</button>
          <button onClick={() => this.props.onSortClick("year_of_production")}>Year of Production</button>
        </div>
        <div>{this.props.cars && this.props.cars.map((car, i) => <div key={i}>
          {!(this.state.editmode === i) ? <div className="listRow">
            <div>{car.registration_number}</div>

            <div>{car.brand}</div>
            <div>{car.model}</div>
            <div>{car.location}</div>
            <div>{car.renting_company}</div>
            <div>{car.price}</div>
            <div>{car.year_of_production}</div>

            <div><button onClick={() => this.onShowAvailabilityClick(i)}>show avaliability</button></div>
            <div><button onClick={() => this.onEditClick(i)}>edit</button></div>
          </div> :
            <div className="listRow">

              <div><input type="text" value={this.state.registration_number} onChange={this.onChange_registration_number} /></div>
              <div><input type="text" value={this.state.brand} onChange={this.onChange_brand} /></div>
              <div><input type="text" value={this.state.model} onChange={this.onChange_model} /></div>
              <div><input type="text" value={this.state.location} onChange={this.onChange_location} /></div>
              <div><input type="text" value={this.state.renting_company} onChange={this.onChange_renting_company} /></div>
              <div><input type="number" value={this.state.price} onChange={this.onChange_price} /></div>
              <div><input type="number" value={this.state.year_of_production} onChange={this.onChange_year_of_production} /></div>
              <div><button onClick={this.onDeleteClick}>delete</button></div>
              <div><button onClick={this.onCancelClick}>cancel</button>
                <button onClick={this.onSaveChangedClick}>save</button></div>
            </div>}

        </div>)}
        </div>
        {this.state.editmode === -1 ?
          <div className="listRow">
            <div><input type="text" value={this.state.registration_number} onChange={this.onChange_registration_number} /></div>
            <div><input type="text" value={this.state.brand} onChange={this.onChange_brand} /></div>
            <div><input type="text" value={this.state.model} onChange={this.onChange_model} /></div>
            <div><input type="text" value={this.state.location} onChange={this.onChange_location} /></div>
            <div><input type="text" value={this.state.renting_company} onChange={this.onChange_renting_company} /></div>
            <div><input type="number" value={this.state.price} onChange={this.onChange_price} /></div>
            <div><input type="number" value={this.state.year_of_production} onChange={this.onChange_year_of_production} /></div>
            <div><button onClick={this.onCancelClick}>cancel</button>
              <button onClick={this.onSaveNewClick}>save</button></div>
          </div> : <button id="addButton" onClick={this.onAddClick}>Add a car</button>}

        {this.props.error && <p>An error occured: {this.props.error}</p>}
      </div>
    );
  }

}

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    cars: state.cars,
    loading: state.loading,
    error: state.error
  }
}
const mapDispatchToProps = (dispatch) => ({
  fetchCars: () => dispatch(fetchCars()),
  onChange: (e, i) => dispatch(onChange(e, i)),
  carAdded: () => dispatch(carAdded()),
  sortCars: (sortedcars) => dispatch(sortCars(sortedcars)),
  setCarId: (id) => dispatch(setCarId(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(PageCarsList))