import React, { Component } from "react";
import logo from '../../logo.svg';
import './App.css';
import ListSide from "../ListSide/ListSide"
import FormSide from "../FormSide/FormSide"
import vacationsData from '../../Data/vacations.json';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      vacations: [],
      ApplicationState: "none",
      vacationToEdit: null,
      searchQuery: ""
    }
    this.update = this.update.bind(this);
    this.add = this.add.bind(this);
    this.componentWillMount = this.componentWillMount.bind(this);
    this.edit = this.edit.bind(this);
    this.delete = this.delete.bind(this);
    this.search = this.search.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  edit(_id) {
    if (this.state.ApplicationState == "edit" && this.state.vacationToEdit == _id) {
      this.setState(prevState => ({
        ApplicationState: "none",
        vacationToEdit: null
      }))
    }
    else {
      this.setState(prevState => ({
        ApplicationState: "edit",
        vacationToEdit: _id,
      }))
    }
  }

  add({ _id = null, _name, _location, _price, _image }) {
    _id = null;
    this.setState(prevState => ({
      vacations: [
        ...prevState.vacations, {
          id: _id !== null ? _id : this.nextId(prevState.vacations),
          name: _name,
          location: _location,
          price: _price,
          image: _image,
        }
      ]
    }))
  }

  componentWillMount() {
    vacationsData.map(item => {
      this.add({ _id: item.id, _name: item.name, _location: item.location, _price: item.price, _image: item.image })
    });
  }

  nextId(vacations = []) {
    let max = vacations.reduce((prev, curr) => prev.id > curr.id ? prev.id : curr.id, 0);
    return ++max;
  }

  update(vacationToUpdate) {
    this.setState(prevState => ({
      ApplicationState: "none",
      vacations: prevState.vacations.map(
        vacation => vacation.id !== vacationToUpdate.id ? vacation : {
          ...vacation, name: vacationToUpdate.name,
          location: vacationToUpdate.location,
          price: vacationToUpdate.price,
          image: vacationToUpdate.image
        }
      )
    }))
  }

  cancel() {
    this.setState(prevState => ({
      ApplicationState: "none"
    }))
  }

  delete(id) {
    this.setState(prevState => ({
      vacations: prevState.vacations.filter(vacation => vacation.id !== id)
    }))
  }

  search(_searchQuery) {
    this.setState(prevState => ({
      ApplicationState: "search",
      searchQuery: _searchQuery
    }))
  }

  render() {
    switch (this.state.ApplicationState) {
      case "none":
        return (
          <div className='App'>
            <ListSide
              ApplicationState={this.state.ApplicationState}
              vacations={this.state.vacations}
              onEdit={this.edit}
              onDelete={this.delete}
              onSearch={this.search}
            />
            <FormSide
              ApplicationState={this.state.ApplicationState}
              onAdd={this.add}
            />
          </div>
        )

      case "edit":
        return (
          <div className='App'>
            <ListSide
              ApplicationState={this.state.ApplicationState}
              vacations={this.state.vacations}
              vacationToEdit={this.state.vacationToEdit}
              onEdit={this.edit}
              onDelete={this.delete}
              onSearch={this.search}
            />
            <FormSide
              ApplicationState={this.state.ApplicationState}
              vacationToEdit={this.state.vacations[this.state.vacationToEdit - 1]}
              onUpdate={this.update}
              onCancel={this.cancel}
            />
          </div>
        )

      case "search":
        const filteredVacations = this.state.vacations.filter(
          vacation => {
            return (
              vacation.name.toLowerCase().includes(this.state.searchQuery.toLowerCase()) ||
              vacation.location.toLowerCase().includes(this.state.searchQuery.toLowerCase())
            )
          }
        )
        return (
          <div className='App'>
            <ListSide
              ApplicationState={this.state.ApplicationState}
              vacations={filteredVacations}
              onEdit={this.edit}
              onDelete={this.delete}
              onSearch={this.search}
            />
            <FormSide
              ApplicationState={this.state.ApplicationState}
              onAdd={this.add}
            />
          </div>
        )
    }
  }
}

export default App;