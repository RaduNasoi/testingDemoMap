package com.smartCity.smartCity.Controllers;

import com.smartCity.smartCity.Entities.Parking;
import com.smartCity.smartCity.Entities.User;
import com.smartCity.smartCity.Repositories.ParkingRepository;
import com.smartCity.smartCity.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.security.SecureRandom;
import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping(value = "/api")
public class UserController {


    private UserRepository userRepository;
    @Autowired
    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;

    }

    @RequestMapping(value = "/users", produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.GET)
    @ResponseBody
    public List<User> getUsers(){
        return userRepository.findAll();
    }

    @RequestMapping(value = "/addUser", produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
    @ResponseBody
    public void insertUser(@RequestParam String username,
                                 @RequestParam String password,
                                 @RequestParam String role,
                           @RequestParam String email,
                           @RequestParam String domain){
        DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
        Date date = new Date();

        User user = new User(username,password,role,email,domain,date);
        if(userRepository.findUserByUsername(user.getUsername()) == null){
            userRepository.save(user);
            //System.out.println("Succes!");
        }



    }

    @RequestMapping(value = "/updateUserRole", produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
    @Transactional
    public void updateUserRole(@RequestParam String username,
                               @RequestParam String role){
        userRepository.updateAddress(username,role);

    }
    @RequestMapping(value = "/deleteUser", produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.DELETE)
    @Transactional
    public void updateUserRole(@RequestParam String username){
        if(userRepository.findUserByUsername(username) != null) {
            userRepository.delete(userRepository.findUserByUsername(username));
        }
    }

    @RequestMapping(value = "/getUserByUsername", produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.GET)
    @ResponseBody
    public User getUserByUsername(@RequestParam String username){
        return userRepository.findUserByUsername(username);
    }
}
