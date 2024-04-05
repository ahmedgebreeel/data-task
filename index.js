var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var BrandModel = require("./brands-schema.ts");
var _mongoose = require("mongoose");
var faker = require('faker');
var fs = require('fs');
var XLSX = require('xlsx');
// connectToMongoDB function
var MONGODB_URI = "mongodb+srv://ibthal923:uK7REMIE0TjohCOE@cluster.dniwp8k.mongodb.net/data?retryWrites=true&w=majority&appName=Cluster";
// const MONGODB_URI = "mongodb+srv://ahmedgebreeeel:yEjQR6cvh2SUXi4i@cluster0.antzmht.mongodb.net/task?retryWrites=true&w=majority&appName=Cluster0";
var connectToMongoDB = function () { return __awaiter(_this, void 0, void 0, function () {
    var error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, _mongoose.connect(MONGODB_URI)];
            case 1:
                _a.sent();
                console.log("connected to mongoDB");
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.log("error in connecting to mongoDB", error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// transformData function
var transformData = function () { return __awaiter(_this, void 0, void 0, function () {
    var brands, _i, brands_1, brand, yearFounded, numberOfLocations, brandName, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 8, , 9]);
                // Connect to MongoDB
                return [4 /*yield*/, connectToMongoDB()];
            case 1:
                // Connect to MongoDB
                _a.sent();
                return [4 /*yield*/, BrandModel.find()];
            case 2:
                brands = _a.sent();
                console.log(brands);
                _i = 0, brands_1 = brands;
                _a.label = 3;
            case 3:
                if (!(_i < brands_1.length)) return [3 /*break*/, 7];
                brand = brands_1[_i];
                yearFounded = brand.yearFounded || brand.yearCreated || brand.yearsFounded;
                numberOfLocations = brand.numberOfLocations;
                // Check if headquarters exists
                if (!brand.headquarters) {
                    console.log('hqAddress exists but headquarters is undefined. Brand:', brand, brand.hqAddress);
                    brand.headquarters = "DuBuqueburgh";
                }
                brandName = brand.brand ? brand.brand.name : brand.brandName;
                // If yearFounded still not found, set it to the minimum allowed year
                if (!yearFounded) {
                    yearFounded = 1600;
                }
                // If numberOfLocations still not found or not a number, set it to 1
                if (!numberOfLocations || isNaN(numberOfLocations)) {
                    numberOfLocations = 1;
                }
                // If brandName is still not found, set a default value
                if (!brandName) {
                    brandName = "Unknown Brand";
                }
                // Update the brand object with the modified values
                brand.yearFounded = yearFounded;
                brand.numberOfLocations = numberOfLocations;
                brand.brandName = brandName;
                // Validate against schema 
                return [4 /*yield*/, BrandModel.validate(brand)];
            case 4:
                // Validate against schema 
                _a.sent();
                // Save modified brand
                return [4 /*yield*/, brand.save()];
            case 5:
                // Save modified brand
                _a.sent();
                _a.label = 6;
            case 6:
                _i++;
                return [3 /*break*/, 3];
            case 7:
                console.log('Data transformation  is completed');
                return [3 /*break*/, 9];
            case 8:
                error_2 = _a.sent();
                console.log("error in transformData method", error_2);
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); };
// Generate test data for 10 new brand documents
var generateTestData = function () {
    var testData = Array.from({ length: 10 }, function () { return ({
        brandName: faker.company.companyName(),
        yearFounded: faker.datatype.number({ min: 1600, max: new Date().getFullYear() }),
        headquarters: faker.address.city(),
        numberOfLocations: faker.datatype.number({ min: 1, max: 100 })
    }); });
    // Document the seed data cases in an Excel file
    var excelData = testData.map(function (data, index) { return ({
        Brand: data.brandName,
        YearFounded: data.yearFounded,
        Headquarters: data.headquarters,
        NumberOfLocations: data.numberOfLocations,
        Description: "Test Case ".concat(index + 1)
    }); });
    // Convert data to worksheet
    var ws = XLSX.utils.json_to_sheet(excelData);
    // Convert worksheet to workbook
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Seed Data");
    // Write workbook to file
    XLSX.writeFile(wb, 'seed_data.xlsx');
};
// Function to export Brands collection as a JSON file
var exportBrandsCollection = function () { return __awaiter(_this, void 0, void 0, function () {
    var brands, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, BrandModel.find()];
            case 1:
                brands = _a.sent();
                // Write the brands collection to a JSON file
                fs.writeFileSync('newbrands.json', JSON.stringify(brands, null, 2));
                console.log('Brands collection exported to newbrands.json');
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                console.error('Error exporting Brands collection:', error_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var execute = function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: 
            // Execute the data transformation
            return [4 /*yield*/, transformData()];
            case 1:
                // Execute the data transformation
                _a.sent();
                // Call the function to generate test data and document seed data
                return [4 /*yield*/, generateTestData()];
            case 2:
                // Call the function to generate test data and document seed data
                _a.sent();
                // Call the function to export the Brands collection
                return [4 /*yield*/, exportBrandsCollection()];
            case 3:
                // Call the function to export the Brands collection
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
execute();
