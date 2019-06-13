import React, { Component } from 'react';

class InputForm extends React.Component {

    render() {
      let {wynik}=this.props;
      let result = Math.round(wynik*100)/100;
      let {taxPLN}= this.props;
      let taxResult = Math.round(taxPLN*100)/100;
      //let wynik1=wynik*10;
     
     return (
       <div>
         <h2> Wyniki obliczeń</h2>
         <p> Dochód: <input value={result} /> </p> <p>Kwotę {result} należy wpisać w kolumnie C w załączniku PIT/ZG </p>
         <p> Podatek: <input value={taxResult} /></p><p> Kwotę {taxResult} należy wpisać w kolumnie D w załączniku PIT/ZG  </p>
         
       </div>
     );
   }
 }
 
 
 export default InputForm;