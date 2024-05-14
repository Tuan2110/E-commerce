package vn.edu.iuh.fit.controllers;

import lombok.RequiredArgsConstructor;
import org.aspectj.weaver.ast.Or;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.iuh.fit.configs.PaymentConfig;
import vn.edu.iuh.fit.models.Order;
import vn.edu.iuh.fit.models.OrderStatus;
import vn.edu.iuh.fit.repositories.OrderRepository;
import vn.edu.iuh.fit.responses.ApiResponse;
import vn.edu.iuh.fit.services.IOrderService;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("${api.prefix}/payments")
public class PaymentController {
    @Value("${front-end.url}")
    private String frontEndUrl;
    private final IOrderService orderService;
    private final OrderRepository orderRepository;


    @PostMapping("/{orderId}")
    public ResponseEntity<?> createPayment(@PathVariable Long orderId) throws UnsupportedEncodingException {
        Order order = orderService.findOrderById(orderId);
        String orderType = "other";
        long amount = (long) (order.getTotalPrice() * 100 * 25265);
        String vnp_TxnRef = PaymentConfig.getRandomNumber(8);
        String vnp_TmnCode = PaymentConfig.vnp_TmnCode;

        Map<String, String> vnp_Params = new HashMap<>();
        vnp_Params.put("vnp_Version", PaymentConfig.vnp_Version);
        vnp_Params.put("vnp_Command", PaymentConfig.vnp_Command);
        vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
        vnp_Params.put("vnp_Amount", String.valueOf(amount));
        vnp_Params.put("vnp_CurrCode", "VND");
        vnp_Params.put("vnp_BankCode", "NCB");
        vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
        vnp_Params.put("vnp_OrderInfo", "Thanh toan don hang:" + vnp_TxnRef);
        vnp_Params.put("vnp_Locale", "vn");
        vnp_Params.put("vnp_ReturnUrl", frontEndUrl+"/payment/"+orderId);
        vnp_Params.put("vnp_OrderType", orderType);
        vnp_Params.put("vnp_IpAddr", PaymentConfig.vnp_IpAddr);


        Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        String vnp_CreateDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_CreateDate", vnp_CreateDate);

        cld.add(Calendar.MINUTE, 15);
        String vnp_ExpireDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);

        List fieldNames = new ArrayList(vnp_Params.keySet());
        Collections.sort(fieldNames);
        StringBuilder hashData = new StringBuilder();
        StringBuilder query = new StringBuilder();
        Iterator itr = fieldNames.iterator();
        while (itr.hasNext()) {
            String fieldName = (String) itr.next();
            String fieldValue = (String) vnp_Params.get(fieldName);
            if ((fieldValue != null) && (fieldValue.length() > 0)) {
                //Build hash data
                hashData.append(fieldName);
                hashData.append('=');
                hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                //Build query
                query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII.toString()));
                query.append('=');
                query.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                if (itr.hasNext()) {
                    query.append('&');
                    hashData.append('&');
                }
            }
        }
        String queryUrl = query.toString();
        String vnp_SecureHash = PaymentConfig.hmacSHA512(PaymentConfig.secretKey, hashData.toString());
        queryUrl += "&vnp_SecureHash=" + vnp_SecureHash;
        String paymentUrl = PaymentConfig.vnp_PayUrl + "?" + queryUrl;
        return ResponseEntity.ok(ApiResponse.builder().status(true).message(paymentUrl).build());
    }
    @GetMapping
    public ResponseEntity<ApiResponse> success(@RequestParam("payment_id")String paymentId,@RequestParam("order_id")Long orderId,@RequestParam("payment_status")String paymentStatus) {
        System.out.println(paymentId);
        Order order = orderService.findOrderById(orderId);
        if(paymentStatus.equals("00")){
            order.setOrderStatus(OrderStatus.PLACED);
            orderRepository.save(order);
            return ResponseEntity.ok(ApiResponse.builder().status(true).message("Payment success").build());
        }
        return ResponseEntity.ok(ApiResponse.builder().status(false).message("Payment failed").build());
    }
}
