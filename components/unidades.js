import React from 'react';
import { render } from 'react-dom';
import Table from 'antd/lib/table';  // just for js
import 'antd/lib/table/style/css';

class Unidades extends React.Component {
  constructor(props) {
    super(props);
    this.state = {tabla: "",
                  keys: "",
                  columns: ""};
  }
  componentWillMount(){
    console.log("props will mount =>"+this.props.central);

  }

   componentWillReceiveProps() {
     console.log("props will receive this =>"+this.props.central);
     let thisSave1 = this;
     console.log("props will receive thissave1 =>"+thisSave1.props.central);
     knex.select('*').from('unidades').where('central', thisSave1.props.central).asCallback(function(err, rows) {
        if (err) return console.error(err);
        thisSave1.setState({tabla: rows, keys: Object.keys(rows[0])});
        let columns = Object.keys(rows[0]).map(k =>{ return {title:k.substring(0,1).toUpperCase()+k.substring(1),dataIndex:k,key:k} });
        thisSave1.setState({columns: columns});
          });
   }

  render () {

    let tabla="";
    if(this.state.tabla !== ""){
      tabla=(<div><h3 style={{paddingTop: "20px", paddingBottom: "10px"}}>Unidades</h3>
       <Table dataSource={this.state.tabla} columns={this.state.columns} /></div>)
    }

    return (<div className="container">
                    {tabla}
            </div>);
  }
}

export default (Unidades);
