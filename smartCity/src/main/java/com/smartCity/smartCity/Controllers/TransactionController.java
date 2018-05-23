package com.smartCity.smartCity.Controllers;

import com.smartCity.smartCity.Entities.Transaction;
import com.smartCity.smartCity.Repositories.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping(value = "/api")
public class TransactionController {

    private TransactionRepository transactionRepository;
    @Autowired
    public TransactionController(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;

    }

    @RequestMapping(value = "/payments", produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.GET)
    @ResponseBody
    public List<Transaction> getPayments(){
        return transactionRepository.findAllByOrderByDateDesc();
    }

    @RequestMapping(value = "/addPayment", produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
    @ResponseBody
    public void insertUser(@RequestParam String username,
                           @RequestParam double price,
                           @RequestParam String owner){

        Date date = new Date();

        Transaction transaction = new Transaction(username,price,owner,date);
        {
            transactionRepository.save(transaction);
            //System.out.println("Succes!");
        }

    }

    @RequestMapping(value = "/getAllPaymentsByOwner", produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.GET)
    @ResponseBody
    public List<Transaction> getAllPaymentsByOwner(@RequestParam String owner){
        return transactionRepository.findByOwnerOrderByDateDesc(owner);
    }

    @RequestMapping(value = "/deleteAll", produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.DELETE)
    @Transactional
    public void deleteAll(){

        transactionRepository.deleteAll();

    }

}
