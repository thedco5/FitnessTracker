package zetta.fitnesstrackerbackend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {

    @PostMapping("/create")
    public ResponseEntity<String> create() {
        return ResponseEntity.ok("Create User");
    }

    @GetMapping("/find") // aint working
    public ResponseEntity<String> find() {
        return ResponseEntity.ok("Find User, id = ");
    }

    @PostMapping("/update/{id}")
    public ResponseEntity<String> update(@PathVariable String id) {
        return ResponseEntity.ok("Update User, id = " + id);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable String id) {
        return ResponseEntity.ok("Delete User, id = " + id);
    }

}