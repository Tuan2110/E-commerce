package vn.edu.iuh.fit.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.edu.iuh.fit.models.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {
}
