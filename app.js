import React from 'react';
import { render } from 'react-dom';
import './node_modules/bootstrap/dist/css/bootstrap.min.css';
import Table from 'antd/lib/table';  // just for js
import 'antd/lib/table/style/css';
//import Unidades from './components/unidades.js'
//import Precios from './components/precios.js'
//selectCEentral

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
                    titulo: "MBC",
                  centrales: "",//total de centrales
                  tablaUnidades: "",
                  keys: "",
                  columnsUnidades: "",
                  tablaPreciosHistoricos: "",
                  columnsPreciosHistoricos: ""
    };
      this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {//Obtiene las carpetas en la carpeta 5000
    let thisSave1 = this;
    knex.select('nombre').from('centrales1').asCallback(function(err, rows) {
      if (err) return console.error(err);
      thisSave1.setState({centrales: rows});
        });
  }

  onChange(event){
      this.tableUnidades(event.target.value);
      this.tablePreciosHistoricos(event.target.value);
    }

 tableUnidades(value) {
   let thisSave1 = this;
   knex.select('*').from('unidades').where('central', value).asCallback(function(err, rows) {
      if (err) return console.error(err);
      if(!rows[0]){
        thisSave1.setState({tablaUnidades: "", keys: ""});
      }
      else{
        thisSave1.setState({tablaUnidades: rows, keys: Object.keys(rows[0])});
        let columnsUnidades = Object.keys(rows[0]).map(k =>{ return {title:k.substring(0,1).toUpperCase()+k.substring(1),dataIndex:k,key:k} });
        thisSave1.setState({columnsUnidades: columnsUnidades});
      }
        });
 }

 tablePreciosHistoricos(value) {
   let thisSave1 = this;
   knex.select('*').from('preciosHistoricos').where('central', value).asCallback(function(err, rows) {
   if (err) return console.error(err);
   if(!rows[0]){
    thisSave1.setState({tablaPreciosHistoricos: "", keys: ""});
   }
   else{
     thisSave1.setState({tablaPreciosHistoricos: rows, keys: Object.keys(rows[0])});
     let columnsPreciosHistoricos = Object.keys(rows[0]).map(k =>{ return {title:k.substring(0,1).toUpperCase()+k.substring(1),dataIndex:k,key:k} });
     thisSave1.setState({columnsPreciosHistoricos: columnsPreciosHistoricos});
   }
     });
 }


  render(){

    let option = [];
    option.push(<option value="#">Selecciona Central</option>);
    if(this.state.centrales !== ""){
      let opciones = this.state.centrales;
      opciones.forEach((a) => {
        option.push(<option value={a.nombre}>{a.nombre}</option>)});
      }

    let unidades = (<div className="col-xs-6"><h2 style={{paddingTop: "20px", paddingBottom: "10px"}}>Unidades</h2>
                      <h3>No hay unidades.</h3>
                    </div>);

    let pHistoricos = (<div className="col-xs-6"><h2 style={{paddingTop: "20px", paddingBottom: "10px"}}>Precios Historicos</h2>
                      <h3>No hay precios historicos.</h3>
                    </div>);

    if(this.state.tablaUnidades !== "")
      unidades=(<div className="col-xs-6"><h2 style={{paddingTop: "20px", paddingBottom: "10px"}}>Unidades</h2>
       <Table style={{fontSize: "2px"}} dataSource={this.state.tablaUnidades} columns={this.state.columnsUnidades} /></div>)
    if(this.state.tablaPreciosHistoricos !== "")
     pHistoricos=(<div className="col-xs-6"><h2 style={{paddingTop: "20px", paddingBottom: "10px"}}>Precios Historicos</h2>
       <Table dataSource={this.state.tablaPreciosHistoricos} columns={this.state.columnsPreciosHistoricos} /></div>)

    let centralSelect = (
                              <select className="form-control" onChange={this.onChange}>
                                {option}
                              </select>);


    return (<div className="container">
                <div className="page-header" style={{textAlign: "center"}}>
                  <h1>{this.state.titulo}</h1>
                </div>
                  <div className="row">
                    <div className="form-group col-xs-4">
                      {centralSelect}
                      </div>
                  </div>
                  <hr/>
                  <div className="row">
                    {unidades}
                    {pHistoricos}
                </div>
          </div>);
  }
}

render(<App/>,
  document.getElementById('app')
);
