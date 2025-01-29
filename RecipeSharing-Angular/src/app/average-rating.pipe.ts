import { Pipe, PipeTransform } from '@angular/core';
import { Review } from './Models/Recipe'; // Ensure Review model has 'stars' property

@Pipe({
  name: 'averageRating'
})
export class AverageRatingPipe implements PipeTransform {
  transform(reviews: Review[]): number {
    if (!reviews || reviews.length === 0) {
      return 0; // Default to 0 if there are no reviews
    }

    const totalStars = reviews.reduce((sum, review) => sum + review.stars, 0);
    return totalStars / reviews.length; // Calculate average rating
  }
}
