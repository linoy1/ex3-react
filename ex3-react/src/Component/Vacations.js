import React, { Component } from 'react';
import { MdDelete, MdEdit, MdSave } from 'react-icons/md';
import { Card, CardContent } from '@mui/material';
import { maxHeight } from '@mui/system';



class Vacations extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editing: false
        }

        this.newVacation = "";
        this.edit = this.edit.bind(this);
        this.delete = this.delete.bind(this);
        this.save = this.save.bind(this);
        this.renderUI = this.renderUI.bind(this);
        this.renderForm = this.renderForm.bind(this);
    }

    edit() {
        this.setState({
            editing: true
        })
    }

    delete() {
        this.props.onDelete(this.props.index);
    }
    save(e) {
        e.preventDefault();
        this.props.onChange(this.newVacation.value, this.props.index);

        this.setState({
            editing: false
        })
    }
    renderForm() {
        return (
            <div >
                <form>
                    <textarea onChange={event => this.newVacation = event.target.value} />
                    <button onClick={this.save} >< MdSave/></button> </form >
            </div>
        )
    }
    renderUI() {
        return (
            <Card sx={{maxWidth:375,marginBottom:'10px'}} raised={true}>
            <CardContent>
                <div > {this.props.children} </div> <span >
                    <button onClick={this.edit} > <MdEdit/> </button>
                    <button onClick={this.delete} ><MdDelete/></button> </span >
            </CardContent>
       </Card>
        )
    }
    render() {
        return this.state.editing ? this.renderForm() : this.renderUI();
    }
}
export default Vacations;