import { Component, OnInit,EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import {ShoppingListService}  from './shopping-list.service'

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  
})
export class ShoppingListComponent implements OnInit {
  // ingredients: Ingredient[]= [
  //   new Ingredient('Apple', 5),
  //   new Ingredient('Tomatoes', 10),

    
  // ];


   ingredients: Ingredient[];
   private igChangeSub : Subscription;
  constructor( private slService : ShoppingListService) { }

  ngOnInit(): void {
   
     this.ingredients = this.slService.getIngredients();

    this.igChangeSub =  this.slService.ingredientsChanged
       .subscribe((ingredients: Ingredient[]) => this.ingredients = ingredients);
     
     

  }

  onEditItem(index: number){

    this.slService.startedEditing.next(index);
         
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.igChangeSub.unsubscribe();
  }

 

 


  // onIngredientAdded(ingredient: Ingredient){

  //   this.ingredients.push(ingredient);
  // }

}
