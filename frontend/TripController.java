package com.travel.travel.Controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.travel.travel.Models.Trip;
import com.travel.travel.Service.TripService;

@RestController
@RequestMapping("/api/trips")
@CrossOrigin(origins = "http://localhost:3000") // Add CORS support for frontend
public class TripController {

    @Autowired
    TripService tripService;

    @PostMapping
    public ResponseEntity<?> createTrip(@RequestBody Trip trip) {
        try {
            // Validate required fields
            if (trip.getUser() == null || trip.getUser().getId() == null) {
                return ResponseEntity.badRequest().body("User ID is required");
            }
            
            if (trip.getFullName() == null || trip.getFullName().trim().isEmpty()) {
                return ResponseEntity.badRequest().body("Full name is required");
            }
            
            if (trip.getEmail() == null || trip.getEmail().trim().isEmpty()) {
                return ResponseEntity.badRequest().body("Email is required");
            }
            
            if (trip.getPhone() == null || trip.getPhone().trim().isEmpty()) {
                return ResponseEntity.badRequest().body("Phone number is required");
            }
            
            Trip savedTrip = tripService.createTrip(trip);
            return ResponseEntity.ok(savedTrip);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error creating trip: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        try {
            System.out.println("Requested Trip ID: " + id);
            Optional<Trip> trip = tripService.tripGetById(id);
            
            if (trip.isPresent()) {
                return ResponseEntity.ok(trip.get());
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error retrieving trip: " + e.getMessage());
        }
    }
    
    // Add endpoint to get trips by user
    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getTripsByUser(@PathVariable Long userId) {
        try {
            var trips = tripService.getTripsByUserId(userId);
            return ResponseEntity.ok(trips);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error retrieving user trips: " + e.getMessage());
        }
    }
    
    // Add endpoint to update trip status
    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateTripStatus(@PathVariable Long id, @RequestBody String status) {
        try {
            Trip updatedTrip = tripService.updateTripStatus(id, status);
            return ResponseEntity.ok(updatedTrip);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error updating trip status: " + e.getMessage());
        }
    }
}
