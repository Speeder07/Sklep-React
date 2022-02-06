import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

class Product{
  constructor(name, price, amount)
  {
    this.name = name;
    this.price = price;
    this.amount = amount;
  }
}

class Program extends React.Component
{
  constructor(props)
  {
    super(props);
    const products = [[new Product("Chleb", 4.25, 1),new Product("Bułka", 1, 1), new Product("Bagietka", 1.5, 1),new Product("Crossant", 1.25, 1),new Product("Kajzerka", 1, 1),new Product("Chleb razowy", 4.75, 1),new Product("Pita", 2, 1)],
    [new Product("Marchew", 0.5, 1),new Product("Pietruszka", 0.8, 1),new Product("Seler", 1, 1),new Product("Pomidor", 2, 1),new Product("Ogórek zielony", 1.5, 1),new Product("Papryka", 2.5, 1),new Product("Cukinia", 4, 1),new Product("Sałata", 4, 1),new Product("Rzodkiewka", 2.5, 1)],
    [new Product("Szynka wiejska", 3.5, 1),new Product("Baleron", 3.8, 1),new Product("Boczek", 3.40, 1),new Product("Pasztet", 2.5, 1),new Product("Kiełbasa swojska", 4, 1),new Product("Salceson", 1.5, 1),new Product("Parówki", 1, 1),new Product("Kabanosy", 0.75, 1)],
    [new Product("Ser", 4, 1),new Product("Śmietana", 3, 1),new Product("Mleko", 2.5, 1),new Product("Jajko", 0.5, 1),new Product("Jogurt", 2.5, 1)],
    [new Product("Jabłka", 0.25, 1),new Product("Banan", 0.5, 1),new Product("Pomarańcza", 0.6, 1),new Product("Cytruna", 1, 1),new Product("Ananas", 1.25, 1),new Product("Truskawki", 0.25, 1),new Product("Jagody", 0.40, 1)]];
    this.state = {products: products,
    basket: []};
    this.ProductBought = this.ProductBought.bind(this);
    this.SubProduct = this.SubProduct.bind(this);
  }

  ProductBought(listI, index)
  {
    this.AddProduct(this.state.products[listI][index]);
    this.setState({basket: this.state.basket},);
  }

  AddProduct(element)
  {
    for (let index = 0; index < this.state.basket.length; index++) {
      if (this.state.basket[index].name == element.name) {
        this.state.basket[index].amount++;
        return;
      } 
    }
    this.state.basket.push(element);
  }

  SubProduct(element)
  {
    for (let index = 0; index < this.state.basket.length; index++) {
      if (this.state.basket[index].name == element.name) {
        this.state.basket[index].amount--;
        if (this.state.basket[index].amount<=0) {
          this.state.basket.splice(index, 1);
        }
      } 
    }
    this.setState({basket: this.state.basket});
  }

  render(){
    let sum = 0;
    for (let index = 0; index < this.state.basket.length; index++) {
      sum+= this.state.basket[index].price * this.state.basket[index].amount;
    }
    return(
      <div id='container'>
        <div id='shop_list'>
        <ShopList elements={this.state.products[0]} index={0} ProductBought={this.ProductBought}/>
        <ShopList elements={this.state.products[1]} index={1} ProductBought={this.ProductBought}/>
        <ShopList elements={this.state.products[2]} index={2} ProductBought={this.ProductBought}/>
        <ShopList elements={this.state.products[3]} index={3} ProductBought={this.ProductBought}/>
        <ShopList elements={this.state.products[4]} index={4} ProductBought={this.ProductBought}/>
        </div>
        <Basket elements={this.state.basket} substract = {this.SubProduct} suma = {sum}/>
      </div>
    );
  }
}

ReactDOM.render(
  <Program/>,
  document.getElementById('root')
);

function ShopList(params) {

  const [sort, setSort] = useState(0);
  const [array, setArray] = useState(params.elements);
  let result; 


  switch (sort) {
    case 1:
      array.sort((a,b)=>(a.name > b.name)?1:-1);
      break;
    case 2:
      array.sort((a,b)=>(a.price <= b.price)?1:-1);
      
      break;
    }

    result = array.map((element, index)=>{
      return(
        <div className='element' onClick={()=>{params.ProductBought(params.index, index)}}><spam>{element.name}</spam><spam className="price">{element.price+"zł"}</spam></div>
      )
    });

  return(
    <div className='list'>
      <div className='s_buttons'>
        <button className='s_button' onClick={()=>{setSort(1)}} style={{backgroundColor: (sort==1?"#4cd137":"#ccc"), color: (sort==1?"#fff":"#000")}}><i class="fas fa-font"></i></button>
        <button className='s_button' onClick={()=>{setSort(2)}} style={{backgroundColor: (sort==2?"#4cd137":"#ccc"), color: (sort==2?"#fff":"#000")}}><i class="fas fa-dollar-sign"></i></button>
      </div>
      <div className='s_container' >
        {result}
      </div>
    </div>
  );
  
}


function Basket(params) {

  const [sort, setSort] = useState(0);
  const [array, setArray] = useState(params.elements);
  let result; 


  switch (sort) {
    case 1:
      array.sort((a,b)=>(a.name > b.name)?1:-1);
      break;
    case 2:
      array.sort((a,b)=>(a.price * a.amount <= b.price * b.amount)?1:-1);
      break;
    case 3:
      array.sort((a,b)=>(a.amount <= b.amount)?1:-1);
      break;
    }

    result = array.map((element, index)=>{
      return(
        <div className='b_element' onClick={()=>{params.substract(element)}}>{element.amount+" "+ element.name+ "  "+element.amount* element.price+"zł"}</div>
      )
    });

  return(
    <div id='basket'>
      <div id='b_buttons'>
        <button className='bs_button' onClick={()=>{setSort(1)}} style={{backgroundColor: (sort==1?"#4cd137":"#ccc"), color: (sort==1?"#fff":"#000")}}><i class="fas fa-font"></i></button>
        <button className='bs_button' onClick={()=>{setSort(2)}} style={{backgroundColor: (sort==2?"#4cd137":"#ccc"), color: (sort==2?"#fff":"#000")}}><i class="fas fa-dollar-sign"></i></button>
        <button className='bs_button' onClick={()=>{setSort(3)}} style={{backgroundColor: (sort==3?"#4cd137":"#ccc"), color: (sort==3?"#fff":"#000")}}><i class="fas fa-boxes"></i></button>
        <span className='suma'>Suma: {params.suma}zł</span>
      </div>
      <div id='b_container'>
        {result}
      </div>
    </div>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
