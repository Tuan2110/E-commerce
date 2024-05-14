package vn.edu.iuh.fit.services.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.exceptions.ProductException;
import vn.edu.iuh.fit.models.Cart;
import vn.edu.iuh.fit.models.CartItem;
import vn.edu.iuh.fit.models.Product;
import vn.edu.iuh.fit.models.User;
import vn.edu.iuh.fit.repositories.CartRepository;
import vn.edu.iuh.fit.requests.AddItemRequest;
import vn.edu.iuh.fit.services.ICartItemService;
import vn.edu.iuh.fit.services.ICartService;
import vn.edu.iuh.fit.services.IProductService;

@Service
@RequiredArgsConstructor
public class CartService implements ICartService {

    private final CartRepository cartRepository;
    private final IProductService productService;
    private final ICartItemService cartItemService;

    @Override
    public Cart createCart(User user) {
        Cart cart = new Cart();
        cart.setUser(user);
        return cartRepository.save(cart);
    }

    @Override
    public String addCartItem(Long userId, AddItemRequest request) throws ProductException {
        Cart cart = cartRepository.findByUser_Id(userId);
        Product product = productService.findProductById(request.getProductId());
        CartItem cartItem = cartItemService.isCartItemExist(cart,product,request.getSize(),userId);
        if(cartItem == null){
            CartItem newCartItem = new CartItem();
            newCartItem.setProduct(product);
            newCartItem.setCart(cart);
            newCartItem.setUserId(userId);
            newCartItem.setSize(request.getSize() == null ? "M" : request.getSize());
            CartItem createdCartItem=cartItemService.createCartItem(newCartItem);
            cart.getCartItems().add(createdCartItem);
            cartRepository.save(cart);
        }
        return "Item added to cart";
    }

    @Override
    public Cart findCartByUserId(Long userId) {
        Cart cart = cartRepository.findByUser_Id(userId);
        int totalPrice = 0;
        int totalItem = 0;
        for(CartItem cartItem:cart.getCartItems()){
            totalPrice+=cartItem.getPrice();
            totalItem+=cartItem.getQuantity();
        }
        cart.setTotalPrice(totalPrice);
        cart.setTotalItem(totalItem);
        return cart;
    }
}
