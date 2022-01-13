import React, { Component } from "react";
import Vacations from "./Vacations";
import vacationData from './../Data/vacations.json';
import { Tooltip } from "@mui/material";
import { MdAdd } from 'react-icons/md';

class VacationList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            vacations: [
                { id: 1, vacation: "Phi Phi Islands", group: "blabla" },
                { id: 2, vacation: "Phi Phi Islands", group: "blabla" },
                { id: 3, vacation: "Phi Phi Islands", group: "blabla" },
            ]
        }
        this.eachVacation = this.eachVacation.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.add = this.add.bind(this);
        this.nextId = this.nextId.bind(this);
        // this.componentDidMount = this.componentDidMount.bind(this);


    }
    update(newVacation, i) {
        console.log(`Update ${i}: newVacation:${newVacation}`);

        this.setState(prevState => ({
            vacation: prevState.vacation.map(
                vacation => vacation.id !== i ? vacation : { ...vacation, vacation: newVacation }
            )
        }));
    }
    delete(id) {
        this.setState(prevState => ({
            vacations: prevState.vacation.filter(vacation => vacation.id !== id)
        }))
    }
    eachVacation(item, i) {
        return <Vacations key={i}
            index={item.id}
            onChange={this.update}
            onDelete={this.delete}>
            <h4> {item.vacation} </h4> 
            <h5 > {item.group} </h5>
            </Vacations>
    }

                    add({id = null, txt = 'default title', grp = 'default group'}) {
                        this.setState(prevState => ({
                            ideas: [
                                ...prevState.ideas, {
                                    id: id !== null ? id : this.nextId(prevState.ideas),
                                    idea: txt,
                                    group: grp
                                }
                            ]
                        }))
                    }
                    nextId(ideas = []) {
                        let max = ideas.reduce((prev, curr) => prev.id > curr.id ? prev.id : curr.id, 0);
                    return ++max;
    }

    // componentDidMount() {
                        //     vacationData.map(item => this.add({ id: item.id, txt: item.vacation, grp: item.group }));
                        // }
                        render() {
        return (
                    <div className="vacation-list" > {this.state.vacations.map(this.eachVacation)}
                        <Tooltip title="Add new vacation" >
                            <button onClick={this.add}> <MdAdd /> </button>
                        </Tooltip>
                    </div>
                    )
    }
}
                    export default VacationList;