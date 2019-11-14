<!-- AUTO-GENERATED-CONTENT:START (STARTER) -->
<p align="center">
  <a href="https://www.gatsbyjs.org">
    <img alt="Gatsby" src="https://www.gatsbyjs.org/monogram.svg" width="60" />
  </a>
</p>
<h1 align="center">
  Gatsby's Unilever
</h1>

## 🚀 Quick start

1.  **Start developing.**

    .env.development file should be created for local development. It should contain following keys:
    * app_local_middleware_key
    * app_local_kritique_apiKey
    * app_local_addThis_key
    * app_local_AemAssetsCredentials_password
    * app_local_AemAssetsCredentials_staticFirstApiKey
    * app_local_AemAssetsCredentials_Authorization
    * app_local_ReCaptcha_clientKey
    * app_local_elasticSearch_buildUserPassword
    * app_local_gigya_script_api_key

    Once create it, navigate into your new site’s directory and start it up.

    ```sh
    yarn install
    yarn run develop
    ```

1.  **Open the source code and start editing!**

    Your site is now running at `http://localhost:8000`!

    _Note: You'll also see a second link: _`http://localhost:8000/___graphql`_. This is a tool you can use to experiment with querying your data. Learn more about using this tool in the [Gatsby tutorial](https://www.gatsbyjs.org/tutorial/part-five/#introducing-graphiql)._

2.  **How to develop component to move it to library in future** Please refer to https://confluence.unileversolutions.com/display/EAT/Library+component+development

3. **Run Tests**
    ```sh
    yarn run test
    ```

4. **Precommit hooks**
  Husky is used for precommit hook. Check .huskyrc for configuration. Typechecking, linting and test will be run. This can be changed in future if committing takes too long.

## 💫 Deploy

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)]()

<!-- AUTO-GENERATED-CONTENT:END -->
 ## Known issues
 Do not upgrade **gatsby-image** package. 
 From **v2.1.0** it uses browser native lazy loading for images. Chrome native lazy loading use hardcoded values for Load-in distance threshold. Because of this, images are loading earler then need and it affects site performance. 
