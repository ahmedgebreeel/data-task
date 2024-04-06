const BrandModel = require("./brands-schema.ts");
const _mongoose = require("mongoose");
const faker = require('faker');
const fs = require('fs');
const XLSX = require('xlsx');



// connectToMongoDB function
const MONGODB_URI = "mongodb+srv://ibthal923:uK7REMIE0TjohCOE@cluster.dniwp8k.mongodb.net/data?retryWrites=true&w=majority&appName=Cluster";

const connectToMongoDB = async()=>{
    try {
       await _mongoose.connect(MONGODB_URI);
        console.log("connected to mongoDB");
    } catch (error) {
        console.log("error in connecting to mongoDB", error);
    }
}


// transformData function
const transformData = async ()=>{
    try {
        // Connect to MongoDB
        await connectToMongoDB();

        // get all brands
        const brands = await BrandModel.find().lean();
        console.log(brands);

        // Loop through brands
for (const brand of brands) {
    // Check for yearFounded in original and alternative field names
    let yearFounded = brand.yearFounded || parseInt(brand.yearCreated) || parseInt(brand.yearsFounded);

    // Check for numberOfLocations in original
    let numberOfLocations = brand.numberOfLocations;

    // Check if headquarters exists and alternative field names
    let headquarters = brand.headquarters || brand.hqAddress;
   
    // Check for brandName in original and alternative field names
    let brandName = brand.brandName || brand.brand?.name;

    // If yearFounded still not found, set it to the minimum allowed year
    if (!yearFounded) {
        yearFounded = 1600; 
    }

    // If numberOfLocations still not found or not a number, set it to 1
    if (!numberOfLocations || isNaN(numberOfLocations)) {
        numberOfLocations = 1;
    }
  
    
    // Update the brand object with the modified values
    brand.yearFounded = +yearFounded;
    brand.numberOfLocations = numberOfLocations; 
    brand.headquarters = headquarters;
    brand.brandName = brandName;

    // Validate against schema 
    await BrandModel.validate(brand);
}
 // Save brands in bulk
 const bulkOps = brands.map((brand: { _id: any; }) => ({
    updateOne: {
        filter: { _id: brand._id },
        update: { $set: brand }
    }
}));
await BrandModel.bulkWrite(bulkOps);
   
        console.log('Data transformation  is completed');
    } catch (error) {
        console.log("error in transformData method", error);
    }
}

// Generate test data for 10 new brand documents
const generateTestData = async() => {
    const testData = Array.from({ length: 10 }, () => ({
        brandName: faker.company.companyName(),
        yearFounded: faker.datatype.number({ min: 1600, max: new Date().getFullYear() }),
        headquarters: faker.address.city(),
        numberOfLocations: faker.datatype.number({ min: 1, max: 100 })
    }));

    // Create new brand documents using testData
    await BrandModel.create(testData);

    console.log('Test data generated and saved successfully.');

    // Document the seed data cases in an Excel file
    const excelData = testData.map((data, index) => ({
        Brand: data.brandName,
        YearFounded: data.yearFounded,
        Headquarters: data.headquarters,
        NumberOfLocations: data.numberOfLocations,
        Description: `Test Case ${index + 1}`
    }));

    // Convert data to worksheet
    const ws = XLSX.utils.json_to_sheet(excelData);

    // Convert worksheet to workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Seed Data");

    // Write workbook to file
    XLSX.writeFile(wb, 'seed_data.xlsx');
};
// Function to export Brands collection as a JSON file
const exportBrandsCollection = async () => {
    try {
        // Retrieve all brands from the database
        const brands = await BrandModel.find();

        // Write the brands collection to a JSON file
        fs.writeFileSync('newbrands.json', JSON.stringify(brands, null, 2));

        console.log('Brands collection exported to newbrands.json');
    } catch (error) {
        console.error('Error exporting Brands collection:', error);
    } finally {
       // Disconnect from MongoDB
       await _mongoose.disconnect();
    }
};




const execute = async ()=>{
        // Execute the data transformation
       await transformData();

        // Call the function to generate test data and document seed data
       
        await generateTestData();

        // Call the function to export the Brands collection
       await exportBrandsCollection();

}

execute();


