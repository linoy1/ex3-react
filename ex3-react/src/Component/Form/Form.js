import React, { Component } from "react";
import Vacations from "./Vacations";
import vacationData from '../../Data/vacations.json';
import { Tooltip, Fab } from "@mui/material";
import { MdAdd } from 'react-icons/md';
import AddIcon from '@mui/icons-material/Add';

class Form extends Component {
    constructor(props) {
        super(props);
    }

    renderForm() {
        return (
            <div >
                <form>


                    <textarea onChange={event => this.newVacation = event.target.value} />
                    <Tooltip title="Add new idea" >
                        <Fab size="medium" color="warning" aria-label="add" onClick={this.add} >
                            <AddIcon />
                        </Fab>
                    </Tooltip><button onClick={this.save} >< MdSave /></button> </form >
            </div>
        )
    }

    render() {
        return this.state.editing ? this.renderForm() : this.renderUI();
    }
}