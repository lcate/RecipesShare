import { Component } from '@angular/core';
import { DietaryPreferences, MealType, MeasurementUnit, Recipe, RecipeAppliance, RecipeIngredient, Review } from '../Models/Recipe';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipesService } from '../shared/services/recipes.service';
import { Constants } from '../Helpers/constants';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../shared/services/authentication.service';
import { User } from '../Models/User';
import { RatingSerivce } from '../shared/services/rating.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.css'
})
export class RecipeDetailsComponent {

  recipeId!: number;
  recipe: Recipe = new Recipe();
  userId!: string;
  reviewForm: FormGroup;
  isSubmitting = false;
  user: User = new User;
  reviews: Review[] = [];
  selectedRating: number = 0;
  canRate = false;

  dietaryPreferences: DietaryPreferences = DietaryPreferences.Omnivore;
  mealType: MealType = MealType.Breakfast;
  image: string = '';
  name: string = '';
  preparationTime: number = 0;
  recipeSteps: string[] = [];
  recipeAppliances: RecipeAppliance[] = [];
  recipeIngredients: RecipeIngredient[] = [];

  constructor(private route: ActivatedRoute, private recipeService: RecipesService, private ratingService: RatingSerivce,
    private fb: FormBuilder, private service: AuthenticationService,)
  {
    this.reviewForm = this.fb.group({
      comment: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  ngOnInit(): void {
    if (this.recipeId){
      this.recipeId = this.recipeId;
    } else {
      this.route.params.subscribe(params => {
        this.recipeId = params['id'];
      });
    }
    if (typeof window === 'undefined'){
      return;
    }

    if (localStorage.getItem(Constants.USER_KEY) !== null){
      this.userId = JSON.parse(localStorage.getItem(Constants.USER_KEY)!).user.id;
      this.getUserById(this.userId);
    }

    this.getRecipeById(this.recipeId);
    this.getReviewsForRecipe(this.recipeId);
  }

  getReviewsForRecipe(recipeId: number) {
    this.ratingService.getRatingsForRecipe(recipeId).subscribe(ratings => {
      this.reviews = ratings;
      this.canRate = this.recipe.userFk !== this.userId && !this.reviews.some(r => r.user.id === this.userId);
    });
  }

  getUserById(userId: string) {
      this.service.getUserById('api/accounts/user/', userId).subscribe({
        next: (user: User) => {
          this.user = user;
        },
        error: (err) => {
          console.error('Failed to fetch user details:', err);
        }
      });
    }

  private getRecipeById(id: number) {
    this.recipeService.getRecipeById(id).subscribe(recipe => {
      this.recipe = recipe;

      this.dietaryPreferences = this.recipe.dietaryPreferences;
      this.image = this.recipe.image;
      this.mealType = this.recipe.mealType;
      this.name = this.recipe.name;
      this.preparationTime = this.recipe.preparationTime;
      this.recipeSteps = this.recipe.recipeSteps;
      this.recipeAppliances = this.recipe.recipeAppliances;
      this.recipeIngredients = this.recipe.recipeIngredients;
    });
  }

  submitReview() {
    if (this.reviewForm.invalid) return;

    this.isSubmitting = true;
    const newReview: Review = {
      user: this.user,
      stars: this.selectedRating,
      comment: this.reviewForm.value.comment,
      createdOn: new Date(),
      recipeId: this.recipeId
    };

    this.ratingService.addRating(newReview).subscribe(() => {
      this.reviews?.push(newReview);
      this.reviewForm.reset();
      this.selectedRating = 0;
      this.canRate = false;
      this.isSubmitting = false;
    }, () => {
      this.isSubmitting = false;
      alert("Error submitting review.");
    });
  }

  setRating(stars: number) {
    this.selectedRating = stars;
  }

  getMeasurementUnitString(unit: MeasurementUnit): string {
    switch (unit){
      case MeasurementUnit.Liters:
        return 'Liters';
      case MeasurementUnit.Cups:
        return 'Cups';
      case MeasurementUnit.Grams:
        return 'Grams';
      case MeasurementUnit.Kilograms:
        return 'Kilograms';
      case MeasurementUnit.Milligrams:
        return 'Milligrams';
      case MeasurementUnit.Milliliters:
        return 'Milliliters';
      case MeasurementUnit.Ounces:
        return 'Ounces';
      case MeasurementUnit.Tablespoons:
        return 'Tablespoons';
      case MeasurementUnit.Teaspoons:
        return 'Teaspoons';
      case MeasurementUnit.Cups:
        return 'Cups';
      default:
        return 'Unknown';
    }
  }

  getDietaryPreferenceString(preference: DietaryPreferences): string {
    switch (preference) {
      case DietaryPreferences.Omnivore:
        return 'Omnivore';
      case DietaryPreferences.Vegetarian:
        return 'Vegetarian';
      case DietaryPreferences.Vegan:
        return 'Vegan';
      case DietaryPreferences.Pescatarian:
        return 'Pescatarian';
      case DietaryPreferences.Carnivore:
        return 'Carnivore';
      case DietaryPreferences.Keto:
        return 'Keto';
      case DietaryPreferences.Paleo:
        return 'Paleo';
      default:
        return 'Unknown';
    }
  }


  getMealTypeString(mealType: MealType): string {
    switch (mealType) {
      case MealType.Breakfast:
        return 'Breakfast';
      case MealType.Brunch:
        return 'Brunch';
      case MealType.Dessert:
        return 'Dessert';
      case MealType.Dinner:
        return 'Dinner';
      case MealType.Drink:
        return 'Drink';
      case MealType.Lunch:
        return 'Lunch';
        case MealType.Snack:
          return 'Snack';
      default:
        return 'Unknown';
    }
  }

  public createImgPath = (serverPath: string) => {
    if (serverPath !== null && serverPath !== '') {
      return `http://localhost:5216/` + serverPath;
    } else {
      return 'https://www.nestledessertsarabia.com/sites/site.prod1.nestledessertsarabia.com/files/default_images/recipe-default-image.png';
    }
  }
}
