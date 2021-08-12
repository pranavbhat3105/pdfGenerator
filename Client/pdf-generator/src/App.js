import React, { Component } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import './script';

import './App.css';

class App extends Component {
  state = {
    name: '',
    receiptId: 0,
  }



  handleChange = ({ target: { value, name }}) => this.setState({ [name]: value })

  createAndDownloadPdf = () => {

    // const name = document.getElementById('username');

    if(document.getElementById("username").value.length === 0)
    {
        alert("empty");
        return 0;
    }
  
    //post request which sends data to req.body in index.js nad it will paste it in the file named result.pdf
    axios.post('/create-pdf', this.state)
    //after post method we will fetch the data and the response type will be in blob  which is in a file like object of raw data or not in js native format.
      .then(() => axios.get('fetch-pdf', { responseType: 'blob' }))
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

        // save as is a file saver method which will help us to save the file 
        saveAs(pdfBlob, 'newPdf.pdf');
      })

      
  }

  render() {
    return (
      <div className="App">

        <div class="row">
              <div class="label">
               <label for="fname">Enter Your Name and click download</label> 
              </div>
              <div class="col-75" id="name">
               <input type="text" id="username" name="Name" placeholder="Enter Your name" pattern="[a-z]{1,15}" onChange={this.handleChange} />
              </div>
              <div class="col-85" id="ID">
              <input type="number" placeholder=" Enter Your User ID" name="receiptId" onChange={this.handleChange} />
              </div>
        </div>
        <div className="btn">
        <button onClick={this.createAndDownloadPdf}>Download PDF</button>
        </div>
       
      </div>
     
    );
  }
}

export default App;