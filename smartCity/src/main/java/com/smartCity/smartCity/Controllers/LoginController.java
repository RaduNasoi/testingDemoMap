package com.smartCity.smartCity.Controllers;

import com.smartCity.smartCity.Entities.User;
import com.smartCity.smartCity.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.StringTokenizer;

@RestController
@RequestMapping(value = "/api")
public class LoginController {

    private UserRepository userRepository;
    @Autowired
    public LoginController(UserRepository userRepository) {
        this.userRepository = userRepository;

    }

    @RequestMapping(value = "/authenticate", produces = MediaType.APPLICATION_JSON_VALUE,  method = {RequestMethod.GET, RequestMethod.POST})
    @ResponseBody
    public User checkCredentials(@RequestParam String username,
                               @RequestParam String password){



        if(userRepository.findUserByUsernameAndPassword(username,password)!=null){

            StringTokenizer st = new StringTokenizer("Java StringTokenizer Example");
            return userRepository.findUserByUsernameAndPassword(username,password);
        }
        return null;
    }
}
