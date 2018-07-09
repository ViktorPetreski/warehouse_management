package com.app.repo;

import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.*;
import com.app.model.product.*;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Repository
public interface ProductRepo extends JpaRepository<Product, Integer> {
    public List<Product> findAll();
    public Page<Product> findAll(Pageable p);
    Optional<Product> findOneById(Integer id)
        ;
    public List<Product> findByWarehouseId(Integer id);
    public Page<Product> findByWarehouseId(Integer id,Pageable p);

    @Query(value = "SELECT p FROM Product p WHERE (p.warehouseId) NOT IN(:id)")
    public Page<Product> findAllButId(@Param("id") Integer id,Pageable page);
    //Product save(Product p);
    //void delete(Product p) ;
    //void delete(Integer id);
    //Product deleteById(Integer id);
    //boolean exists( Integer id);
}

