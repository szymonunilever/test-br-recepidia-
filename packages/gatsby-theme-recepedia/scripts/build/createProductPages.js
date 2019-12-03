const path = require('path');
const ProductFields = `
    id
    productId
    brand
    productName
    longPageDescription
    ingredients
    allergy
    productTags
    fields {
      slug
    }
`;

const component = path.resolve(
  `./src/templates/BrandProductDetailsPage/BrandProductDetailsPage.tsx`
);

module.exports = async ({ graphql, createPage, page }) => {
  const result = await graphql(`
    {
      allProduct {
        nodes {
          ${ProductFields}
        }
      }
    }
  `);
  const allProduct = result.data.allProduct.nodes;

  allProduct.forEach(node => {
    createPage({
      path: node.fields.slug,
      component,
      context: {
        title: node.productName,
        page,
        product: node,
      },
    });
  });
};
