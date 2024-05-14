package vn.edu.iuh.fit.services;

import vn.edu.iuh.fit.exceptions.UserException;
import vn.edu.iuh.fit.models.Cart;
import vn.edu.iuh.fit.models.CartItem;
import vn.edu.iuh.fit.models.Product;

public interface ICartItemService {

    CartItem createCartItem(CartItem cartItem);
    CartItem updateCartItem(Long userId, Long id, CartItem cartItem) throws UserException;
    CartItem isCartItemExist(Cart cart, Product product, String size, Long userId);
    void removeCartItem(Long userId, Long cartItemId) throws UserException;
    CartItem findCartItemById(Long cartItemId);
}
