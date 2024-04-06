


1 - Data Transformation
You will be provided with a MongoDB collection named brands (Brands collection: brands.json),
containing 10 documents representing sample brands. These documents have intentional
mistakes in their schema, such as incorrect field names, types, and validations.
Your task is to write a TypeScript code project using Mongoose to transform this data into a
correct format based on a given schema: Brands schema: brands-schema.ts
Transform the data in-place in the same documents (same object Id) and the same collection.
Import the file first to a MongoDB database then apply the transformations on the brands
collection in your database. Do not migrate or re-save the data to another database during
transformation.
Ensure that the data is validated against the schema during the transformation process.
Notes
● If the yearFounded or numberOfLocations field is available in another field with a
different name in the same document, you should get it from that other field.
● If the yearFounded or numberOfLocations field is not available at all in the document
with a correct data format, use the minimum year as per the schema.
● Your code should be specific only for the Brands schema (not to any generic schema),
so you can use specific field names in your code, etc.
2 - Data Seeding
●
●
●
Extend the database by generating 10 new brand documents with correct schema
adherence.
Use any data library (e.g., Faker.js) to create test data for the new entries with different
cases.
Document the seed data cases in an Excel file to explain what differentiates each case.
3 - Export the Brands collectionrun node index.js to run the project 
After you transform the data within the same database and after seeding the test data,
export the brands collection as a json file.

run the project using   node index.js 
