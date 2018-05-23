package com.smartCity.smartCity.Repositories;


import com.smartCity.smartCity.Entities.Transaction;
import org.springframework.data.repository.CrudRepository;

import java.util.Date;
import java.util.List;

public interface TransactionRepository extends CrudRepository<Transaction, Long> {

    List<Transaction> findAllByOrderByDateDesc();
    List<Transaction> findAllByOwner(String owner);
    List<Transaction> findByOwnerOrderByDateDesc(String owner);

    void deleteAll();

}
