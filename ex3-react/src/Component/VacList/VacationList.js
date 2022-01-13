import React, { Component } from "react";
import Vacations from "./Vacations";
import vacationData from '../../Data/vacations.json';
import { Tooltip, Fab } from "@mui/material";
import { MdAdd } from 'react-icons/md';
// import { Tooltip, Fab } from '@mui/material' ;
import AddIcon from '@mui/icons-material/Add';
// import Form from "../Form/Form";

class VacationList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            vacations: [],
        
          }

    
        this.eachVacation = this.eachVacation.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.add = this.add.bind(this);
        this.nextId = this.nextId.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);


    }
    update(newVacation, i) {
        console.log(`Update ${i}: newVacation:${newVacation}`);

        this.setState(prevState => ({
            vacations: prevState.vacations.map(
                vacation => vacation.id !== i ? vacation : {
                    ...vacation,
                    name: newVacation.name,
                    location: newVacation.location,
                    price: newVacation.price,
                    image: newVacation.image
                }
            )
        }));
    }
    delete(id) {
        this.setState(prevState => ({
            vacations: prevState.vacations.filter(vacation => vacation.id !== id)
        }))
    }
    eachVacation(item, i) {
        return (
        <Vacations key={i}
            index={item.id}
            onChange={this.update}
            onDelete={this.delete} >
            <h4 > {item.vacation} </h4>
            <h5 > {item.group} </h5>
        </Vacations>)
    }

    add({ id = null, _name, _location, _price, _image }) {
        this.setState(prevState => ({
            vacations: [
                ...prevState.vacations, {
                    id: id !== null ? id : this.nextId(prevState.vacations),
                    name: _name,
                    location: _location,
                    price: _price,
                    image: _image
                }
            ]
        }))
    }
    nextId(vacations = []) {
        let max = vacations.reduce((prev, curr) => prev.id > curr.id ? prev.id : curr.id, 0);
        return ++max;
    }

    componentDidMount() {
        vacationData.map(item => this.add({ id: item.id, _name: item.name, _location: item.location, _price: item.price, _image: item.image }));

    }

    render() {
        return (
            <div className="vacation-list"  > 
             {this.state.vacations.map(this.eachVacation)} 
            </div>
        )
    }
}
export default VacationList;