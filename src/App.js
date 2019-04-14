import React, { Component } from 'react';
//import logo from './logo.svg';
import InputForm from './components/Results';
import './App.css';

const data = new Date();
 console.log(data);
class App extends React.Component {
  state = {
    days: 0,
    dieta: 49,
    country: 'Niemcy',
    kurs:'',
    message: '',
    profit: 0,
    tax: 0,
   // isChecked: true,
    wynik: '',
    taxPLN: 0,
    datakursu: '',
    dateto: '',
    datefrom: ''
  };
  
 handleDietaChange = (e) => {
    this.setState({
      dieta: e.target.value,
    });
  }
 handleDaysChange = (e) => {
    this.setState({
     days: e.target.value
    });
  }
 
  handleCountryChange = (e) => {
    const country=e.target.value;
    let dietacountry = '';
 switch(country) {
  case 'Niemcy':
     dietacountry= 49;
    break;
  case 'Belgia':
     dietacountry=48;
    break;
  case 'Francja':
     dietacountry=50;
    break;
    case 'Holandia':
     dietacountry=50;
     break;
     case 'Irlandia':
     dietacountry=52;
     break;
     case 'other':
      alert ('wpisz kwotę diety ręcznie');
    break;
  default:
  
} 
    this.setState({
     country: e.target.value,
      dieta: dietacountry
    });
  }
  
  handleWynikChange = () => {
    this.setState({
      wynik: (this.state.profit - (0.3 * this.state.dieta * this.state.days))*this.state.kurs,
      taxPLN: this.state.tax * this.state.kurs,
    });
    const country=this.state.country;
    const wynik= this.state.wynik;
  
    if (country=='Niemcy'|| country == 'Francja') {
      alert ('Kwote ' +wynik+' należy wpisać w kolumnie C w załączniku PIT/ZG');
    }
    else {
        alert ('inne państwo');
       }
    
  }

  handleWynik1Change = (e) => {
    this.setState({
      wynik: e.target.value
    });
  }

  handleKursChange = (e) => {
    this.setState({
      kurs: e.target.value
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


handleDataKursu = (e) => {
    const aktualDate=e.target.value;
    const url= 'https://api.nbp.pl/api/exchangerates/rates/a/eur/'+aktualDate+'/?format=json';
fetch(url)
   .then(resp => resp.json())
    .then(myJson => {
     let wal = JSON.stringify(myJson.rates[0].mid);
        console.log(wal); 
  
   this.setState({
     datakursu: aktualDate,
      kurs: wal
    })
  
}
    ).catch(error => {
     this.setState({
     datakursu: aktualDate,
      kurs: ''
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
         Wybierz państwo: <select value={this.state.country} onChange={this.handleCountryChange}>
          <option value="Niemcy">Niemcy</option>
          <option value="Francja">Francja</option>
          <option value="Belgia">Belgia</option>
          <option value="Holandia">Holandia</option>
          <option value="Irlandia">Irlandia</option>
          <option value="other">inne państwo</option>
        </select>
        <p>Wysokość diety: <input className='input' value={this.state.dieta} onChange={this.handleDietaChange} /></p>
         Data od:   <input type="date" value={this.state.datefrom} onChange={this.handleDateFromChange}/> Data do:  <input type="date" value={this.state.dateto} onChange={this.handleDateToChange}/> 
         <p>Ilość dni: <input value={this.state.days} onChange={this.handleDaysChange} /> </p>
        <p> Data kursu: <input type="date" value={this.state.datakursu} onChange={this.handleDataKursu} /></p> 
        <p> Wysokość kursu w euro: <input value={this.state.kurs} onChange={this.handleKursChange} /></p>
         <p> Przychód w euro: <input value={this.state.profit} onChange={this.handleProfitChange} /></p> 
         <p> Podatek w euro: <input value={this.state.tax} onChange={this.handleTaxChange} /></p> 
       
    
        <div> 
         
          <button onClick={this.handleWynikChange}> Oblicz </button> 
          <InputForm  wynik={this.state.wynik} taxPLN={this.state.taxPLN}/> 
        </div>
      </div>
      </div>
    );
  }
}



export default App;
