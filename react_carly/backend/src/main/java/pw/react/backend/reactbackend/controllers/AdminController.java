package pw.react.backend.reactbackend.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import pw.react.backend.reactbackend.config.JwtTokenUtil;
import pw.react.backend.reactbackend.dao.AdminRepository;
import pw.react.backend.reactbackend.model.*;
import pw.react.backend.reactbackend.service.AdminService;
import pw.react.backend.reactbackend.service.JwtUserDetailsService;

import javax.validation.Valid;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

import static java.util.stream.Collectors.joining;


@CrossOrigin
@RestController
@RequestMapping(path = "/admins")
public class AdminController {

    private AdminRepository applicationUserRepository;
    private AdminService AdminService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private JwtUserDetailsService userDetailsService;

    @Autowired
    public AdminController(AdminRepository repository, AdminService RentingService) {
        this.applicationUserRepository = repository;
        this.AdminService = RentingService;
    }

    @PostMapping
    public ResponseEntity<?> createAdmin(@RequestHeader HttpHeaders headers, @Valid @RequestBody Admin adm) {
        UserDetails userDetails = userDetailsService.loadUserByUsername(adm.getUsername());
        System.out.println(adm.getUsername());
        if (userDetails.getPassword().equals(adm.getPassword())) {
            String token = jwtTokenUtil.generateToken(userDetails);
            return ResponseEntity.ok(new JwtResponse(token));
        } else
            return new ResponseEntity<String>("Unauthorized", HttpStatus.UNAUTHORIZED);
    }


    @GetMapping(path = "")
    public ResponseEntity<Collection<Admin>> getAllAdminsActivity(@RequestHeader HttpHeaders headers,
                                                                  @RequestParam(required = false) String filter) {
        if (filter == null)
            return ResponseEntity.ok(applicationUserRepository.findAll());
        return ResponseEntity.status(404).body(Collections.emptyList());
    }

    @PostMapping(path = "/register")
    public ResponseEntity<String> createAdmin(@RequestHeader HttpHeaders headers, @Valid @RequestBody List<Admin> adm) {
        List<Admin> result = applicationUserRepository.saveAll(adm);
        return ResponseEntity.ok(result.stream().map(c -> String.valueOf(c.getUser_id())).collect(joining(",")));
    }

    private void authenticate(String username, String password) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }
    }

}
