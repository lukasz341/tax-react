import React, { Component } from 'react';

import InputForm from './components/Results';
import './App.css';

const data = new Date();
 console.log(data);
class App extends React.Component {
  state = {
    days: 0,
    diet: 49,
    country: 'Niemcy',
    course:'',
    message: '',
    profit: 0,
    tax: 0,
   // isChecked: true,
    result: '',
    taxPLN: 0,
    dateCourse: '',
    dateto: '',
    datefrom: ''
  };
  
 handleDietChange = (e) => {
    this.setState({
      diet: e.target.value,
    });
  }
 handleDaysChange = (e) => {
    this.setState({
     days: e.target.value
    });
  }
 
  handleCountryChange = (e) => {
    const country=e.target.value;
    let dietcountry = '';
 switch(country) {
  case 'Niemcy':
     dietcountry= 49;
    break;
  case 'Belgia':
     dietcountry=48;
    break;
  case 'Francja':
     dietcountry=50;
    break;
    case 'Holandia':
     dietcountry=50;
     break;
     case 'Irlandia':
     dietcountry=52;
     break;
     case 'other':
      alert ('wpisz kwotę diety ręcznie');
    break;
  default:
  
} 
    this.setState({
     country: e.target.value,
      diet: dietcountry
    });
  }
  
  resultChange =() => {

    this.setState({
      result: (this.state.profit - (0.3 * this.state.diet * this.state.days))*this.state.course,
      taxPLN: this.state.tax * this.state.course,
    });

  }

  handleResultChange = () => {
    this.resultChange();
    
   // if (this.state.result==0) {
   //   alert ('wpisz poprawną kwotę');
   // }
    const country=this.state.country;
    const result= this.state.result;
  /*
    if (country=='Niemcy'|| country == 'Francja') {
      alert ('Kwote ' +result+' należy wpisać w kolumnie C w załączniku PIT/ZG');
    }
    else {
        alert ('inne państwo');
       }
    */
  }

  handleResult1Change = (e) => {
    this.setState({
      result: e.target.value
    });
  }

  handleKursChange = (e) => {
    this.setState({
      course: e.target.value
    });
  }
  
    handleProfitChange = (e) => {
    this.setState({
      profit: e.target.value
    });
  }
  handleTaxChange = (e) => {
    this.setState({
      tax: e.target.value
    });
  }

  handleDateFromChange = (e) => {
    //this.handleDateToChange();
    const daysfrom = new Date(e.target.value);
    const daysto = new Date(this.state.dateto);
    const numberofdays = (1000 * 3600 * 24);

    if (daysfrom>daysto) {
      alert ('data od musi być wcześniejsza od daty do');
    }
    
    this.setState({
      datefrom: e.target.value,
      days: (daysto.getTime()-daysfrom.getTime())/numberofdays+1
    });

   
  }


  
  handleDateToChange = (e) => {
    const daysfrom = new Date(this.state.datefrom);
    const daysto = new Date(e.target.value);
   const numberofdays = (1000 * 3600 * 24);

   if (daysfrom>daysto) {
    alert ('data od musi być wcześniejsza od daty do');
  }
    this.setState({
     dateto: e.target.value,
      days: (daysto.getTime()-daysfrom.getTime())/numberofdays+1
    });

  }


handleDateCourse = (e) => {
    const aktualDate=e.target.value;
    const url= 'https://api.nbp.pl/api/exchangerates/rates/a/eur/'+aktualDate+'/?format=json';
fetch(url)
   .then(resp => resp.json())
    .then(myJson => {
     let wal = JSON.stringify(myJson.rates[0].mid);
        console.log(wal); 
  
   this.setState({
     dateCourse: aktualDate,
      course: wal
    })
  
}
    ).catch(error => {
     this.setState({
     dateCourse: aktualDate,
      course: ''
    });
  alert('Brak kursu z podanego dnia')
}
 );  
 console.log(aktualDate);
  }
  
  handleCheckboxChange = (e) => {
    this.setState({
      isChecked: e.target.checked
    });
  }

  render() {
    return (
      <div>
      <div className='main'>
      <h1> Podatek zagraniczny</h1>
      <h4> Program służy do pomocy przy wypełnianiu zeznania PIT-36 wraz z załącznikiem PIT/ZG (dochody z zagranicznych źródeł)</h4>
         Wybierz państwo: <select value={this.state.country} onChange={this.handleCountryChange}>
          <option value="Niemcy">Niemcy</option>
          <option value="Francja">Francja</option>
          <option value="Belgia">Belgia</option>
          <option value="Holandia">Holandia</option>
          <option value="Irlandia">Irlandia</option>
          <option value="other">inne państwo</option>
        </select>
        <p>Wysokość diety: <input className='input' value={this.state.diet} onChange={this.handleDietChange} /></p>
         Data od:   <input type="date" value={this.state.datefrom} onChange={this.handleDateFromChange}/> Data do:  <input type="date" value={this.state.dateto} onChange={this.handleDateToChange}/> 
         <p>Ilość dni: <input value={this.state.days} onChange={this.handleDaysChange} /> </p>
        <p> Data kursu: <input type="date" value={this.state.dateCourse} onChange={this.handleDateCourse} /></p> 
        <p> Wysokość kursu w euro: <input value={this.state.course} onChange={this.handleKursChange} /></p>
         <p> Przychód w euro: <input value={this.state.profit} onChange={this.handleProfitChange} /></p> 
         <p> Podatek w euro: <input value={this.state.tax} onChange={this.handleTaxChange} /></p> 
       
    
        <div> 
         
          <button onClick={this.handleResultChange}> Oblicz </button> 
          <InputForm  result={this.state.result} taxPLN={this.state.taxPLN}/> 
        </div>
      </div>
      </div>
    );
  }
}



export default App;
