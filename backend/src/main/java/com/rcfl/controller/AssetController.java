package com.rcfl.controller;

import com.rcfl.entity.Asset;
import com.rcfl.service.AssetService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/assets")
@CrossOrigin(origins = "http://localhost:3000") // optional but safe
public class AssetController {

    private final AssetService assetService;

    // Constructor Injection
    public AssetController(AssetService assetService) {
        this.assetService = assetService;
    }

    // ==========================
    // ADD NEW ASSET (POST)
    // ==========================
    @PostMapping
    public Asset addAsset(@RequestBody Asset asset) {
        return assetService.saveAsset(asset);
    }

    // ==========================
    // GET ALL ASSETS (GET)  ✅ REQUIRED FOR DASHBOARD
    // ==========================
    @GetMapping
    public List<Asset> getAllAssets() {
        return assetService.getAllAssets();
    }
}
