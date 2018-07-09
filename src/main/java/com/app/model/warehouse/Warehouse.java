package com.app.model.warehouse;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@Entity
@Table(name = "warehouses")
public class Warehouse {

    @Id
    private Integer id;
    private String name;
    private String address;

    public Warehouse(){}

}
