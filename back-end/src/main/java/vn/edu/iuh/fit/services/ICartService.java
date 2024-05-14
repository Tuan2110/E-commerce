package vn.edu.iuh.fit.services;

import vn.edu.iuh.fit.exceptions.ProductException;
import vn.edu.iuh.fit.models.Cart;
import vn.edu.iuh.fit.models.User;
import vn.edu.iuh.fit.requests.AddItemRequest;

public interface ICartService {

    Cart createCart(User user);

    String addCartItem(Long userId, AddItemRequest request) throws ProductException;

    Cart findCartByUserId(Long userId);
}
