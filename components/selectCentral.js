import React from 'react';
import { render } from 'react-dom';

class SelectCentral extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {//Obtiene las carpetas en la carpeta 5000
    let thisSave1 = this;
    knex.select('nombre').from('centrales1').asCallback(function(err, rows) {
      if (err) return console.error(err);
      thisSave1.props.updateCentrales(rows);
        });
  }

  onChange(event){
    console.log(event.target.value);
    this.props.updateCentral(event.target.value);
    console.log(this.props.central);
   }

  render () {
    let option = [];
    option.push(<option value="#">Selecciona Central</option>);
    if(this.props.centrales !== ""){
      let opciones = this.props.centrales;
      opciones.forEach((a) => {
        option.push(<option value={a.nombre}>{a.nombre}</option>)});
    }

    let randomSelect = (<div className="form-group">
                          <select className="form-control" onChange={this.onChange}>
                            {option}
                          </select>
                        </div>);

    return (<div className="container">
                {randomSelect}
            </div>);
  }
}

export default (SelectCentral);
