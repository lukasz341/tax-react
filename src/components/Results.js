import React, { Component } from 'react';

class InputForm extends React.Component {

    render() {
      let {wynik}=this.props;
      let result = Math.round(wynik*100)/100;
      let {taxPLN}= this.props;
      //let wynik1=wynik*10;
     
     return (
       <div>
         <h2> Wyniki obliczeń</h2>
         <p> Dochód: <input value={result} /> </p>
         <p> Podatek: <input value={taxPLN} /> </p>
         
       </div>
     );
   }
 }
 
 
 export default InputForm;