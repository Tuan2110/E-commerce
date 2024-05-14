package vn.edu.iuh.fit.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.edu.iuh.fit.models.Address;

public interface AddressRepository extends JpaRepository<Address, Long> {
    Address findByUserIdAndCityAndZipCodeAndMobile(Long userId, String city, String zipCode, String mobile);
}