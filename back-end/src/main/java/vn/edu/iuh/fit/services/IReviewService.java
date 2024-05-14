package vn.edu.iuh.fit.services;

import vn.edu.iuh.fit.exceptions.ProductException;
import vn.edu.iuh.fit.models.Review;
import vn.edu.iuh.fit.models.User;
import vn.edu.iuh.fit.requests.ReviewRequest;

import java.util.List;

public interface IReviewService {
    List<Review> getReviewsByProduct(Long productId);

    Review createReview(User user, ReviewRequest review, Long productId, Long itemId) throws ProductException;
}
