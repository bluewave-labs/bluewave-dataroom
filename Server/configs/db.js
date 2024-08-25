const PORT = process.env.PORT || 5000;

/**
 * Establishes a connection to the database and starts the server.
 *
 * @param {Object} app - The Express app instance.
 * @param {Object} db - The database connection object.
 */
const startServerWithDbConnection = async (app, db) => {
  try {
    // Attempt to connect to the database
    await db.connect();
    
    // Start the server if the database connection is successful
    app.listen(PORT, () => {
      console.log(`Server started on port: ${PORT}`);
    });
  } catch (error) {
    // Log an error if the database connection fails
    console.log("Failed to connect to the database");
    console.error(error);
  }
};

module.exports = { startServerWithDbConnection };
