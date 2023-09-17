## How to import api
1. Add the json file[^JsonFile] according to the actual parameters of the API in `./cypress/fixtures` document

   ```
   isDone: Whether the file has already been run
   apiJson: Actual api parameters
   // If header and postdata are empty, replace with ""

   ```
2. Modifying Test File Parameters
    ```
    // Fill the name of the json file created in the first step into the parameter
    const fileName = type_your_json
    ```

3. Add the `cypress.env.json` file to the project root directory and add the following
    ```
    {
    "ACCOUNT": your_account,
    "PASSWORD": your_password
    }   
    ```

4. `yarn cypress open`

5. run `add-api.cy.js`

[^JsonFile]: Refer to example.json