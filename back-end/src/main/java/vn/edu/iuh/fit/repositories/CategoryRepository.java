package vn.edu.iuh.fit.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import vn.edu.iuh.fit.models.Category;

public interface CategoryRepository extends JpaRepository<Category,Long> {
    Category findByName(String name);
    @Query("SELECT c FROM Category c WHERE c.name = :name and c.parentCategory.name = :parentCategoryName")
    Category findByNameAndParent(@Param("name") String name, @Param("parentCategoryName") String parentCategoryName);
}
