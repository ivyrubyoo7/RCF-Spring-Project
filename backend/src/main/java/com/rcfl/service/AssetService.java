package com.rcfl.service;

import com.rcfl.entity.Asset;
import com.rcfl.repository.AssetRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AssetService {

    private final AssetRepository assetRepository;

    // Constructor Injection
    public AssetService(AssetRepository assetRepository) {
        this.assetRepository = assetRepository;
    }

    // ==========================
    // SAVE ASSET (POST)
    // ==========================
    public Asset saveAsset(Asset asset) {
        return assetRepository.save(asset);
    }

    // ==========================
    // GET ALL ASSETS (GET) ✅ REQUIRED
    // ==========================
    public List<Asset> getAllAssets() {
        return assetRepository.findAll();
    }
}
