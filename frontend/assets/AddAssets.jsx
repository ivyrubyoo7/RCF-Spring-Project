import React, { useState } from "react";
import "./AddAssets.css";

const AddAssets = () => {

    // ==========================
    // FORM STATE
    // ==========================
    const [asset, setAsset] = useState({
        model: "",
        modelNumber: "",
        assetType: "",
        category: "",
        department: "",
        inCharge: ""
    });

    // ==========================
    // HANDLE INPUT CHANGE
    // ==========================
    const handleChange = (e) => {
        setAsset({
            ...asset,
            [e.target.name]: e.target.value
        });
    };

    // ==========================
    // HANDLE FORM SUBMIT
    // ==========================
    const handleSubmit = async (e) => {
        e.preventDefault();

        // DEBUG: confirm frontend data
        console.log("ASSET DATA BEING SENT:", asset);

        const token = localStorage.getItem("token");

        try {
            const response = await fetch("http://localhost:8080/api/assets", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(asset)
            });

            // ❌ Backend error
            if (!response.ok) {
                const errorText = await response.text();
                console.error("BACKEND RESPONSE:", errorText);
                throw new Error("Backend rejected request");
            }

            // ✅ Success
            alert("Asset saved successfully");

            // Reset form
            setAsset({
                model: "",
                modelNumber: "",
                assetType: "",
                category: "",
                department: "",
                inCharge: ""
            });

        } catch (error) {
            console.error("FULL ERROR:", error);
            alert("Error saving asset. Check console.");
        }
    };

    return (
        <div className="add-assets-page">
            <div className="add-assets-card">

                <h2 className="section-title">
                    <span>New Hardware</span>
                </h2>

                <form onSubmit={handleSubmit}>

                    {/* Model details */}
                    <input
                        type="text"
                        name="model"
                        placeholder="Model Name"
                        value={asset.model}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="modelNumber"
                        placeholder="Model Number"
                        value={asset.modelNumber}
                        onChange={handleChange}
                        required
                    />

                    {/* Asset classification */}
                    <input
                        type="text"
                        name="assetType"
                        placeholder="Type (Laptop, Desktop, Printer)"
                        value={asset.assetType}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="category"
                        placeholder="Category"
                        value={asset.category}
                        onChange={handleChange}
                    />

                    {/* Department */}
                    <select
                        name="department"
                        value={asset.department}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Department</option>
                        <option value="ADMIN">Admin</option>
                        <option value="UREA">Urea</option>
                        <option value="AMMONIA">Ammonia</option>
                        <option value="HEAVY_WATER">Heavy Water</option>
                    </select>

                    {/* Responsibility */}
                    <input
                        type="text"
                        name="inCharge"
                        placeholder="In-charge"
                        value={asset.inCharge}
                        onChange={handleChange}
                    />

                    <button type="submit">Save Asset</button>
                </form>

            </div>
        </div>
    );
};

export default AddAssets;
