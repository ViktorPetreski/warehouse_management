package com.app.repo;

import com.app.model.warehouse.Warehouse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Repository
public interface WarehoueseRepo  extends JpaRepository<Warehouse, Integer> {
    public List<Warehouse> findAll();

}
