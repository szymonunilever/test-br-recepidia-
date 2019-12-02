import { storiesOf } from '@storybook/react';
import React from 'react';
import { Sitemap, SitemapCategoryEntry } from '../index';
import { TagName } from '../index';

export const content: SitemapCategoryEntry[] = [
  {
    title: 'Recipes',
    path: '/recipes',
    categoryItems: [
      { title: 'recipe1', path: '/recipes/recipe1' },
      { title: 'recipe2', path: '/recipes/recipe2' },
      { title: 'recipe3', path: '/recipes/recipe3' },
      { title: 'recipe4', path: '/recipes/recipe4' },
      { title: 'recipe5', path: '/recipes/recipe5' },
      { title: 'recipe6', path: '/recipes/recipe6' },
      { title: 'recipe7', path: '/recipes/recipe7' },
    ],
  },
  {
    title: 'Products',
    path: '/products',
    categoryItems: [
      { title: 'product1', path: '/recipes/product1' },
      { title: 'product2', path: '/recipes/product2' },
      { title: 'product3', path: '/recipes/product3' },
      { title: 'product4', path: '/recipes/product4' },
      { title: 'product5', path: '/recipes/product5' },
      { title: 'product6', path: '/recipes/product6' },
      { title: 'product7', path: '/recipes/product7' },
    ],
  },
  {
    title: 'Contact us',
    path: '/contacts',
  },
  {
    title: 'FAQ',
    path: '/faq',
  },
];
const multipleNesting: SitemapCategoryEntry[] = [
  {
    title: 'Multiple Nesting',
    path: '/multiple/nesting',
    categoryItems: [
      {
        title: 'product1',
        path: '/recipes/product1',
        categoryItems: [
          { title: 'product1', path: '/recipes/product1' },
          { title: 'product2', path: '/recipes/product2' },
          { title: 'product3', path: '/recipes/product3' },
          { title: 'product4', path: '/recipes/product4' },
          { title: 'product5', path: '/recipes/product5' },
          { title: 'product6', path: '/recipes/product6' },
          { title: 'product7', path: '/recipes/product7' },
        ],
      },
      { title: 'product2', path: '/recipes/product2' },
      { title: 'product3', path: '/recipes/product3' },
      { title: 'product4', path: '/recipes/product4' },
      { title: 'product5', path: '/recipes/product5' },
      { title: 'product6', path: '/recipes/product6' },
      {
        title: 'product7',
        path: '/recipes/product7',
        categoryItems: [
          { title: 'product1', path: '/recipes/product1' },
          { title: 'product2', path: '/recipes/product2' },
          { title: 'product3', path: '/recipes/product3' },
          { title: 'product4', path: '/recipes/product4' },
          { title: 'product5', path: '/recipes/product5' },
          { title: 'product6', path: '/recipes/product6' },
          { title: 'product7', path: '/recipes/product7' },
        ],
      },
    ],
  },
  {
    title: 'Multiple Nesting1',
    path: '/multiple/nesting1',
    categoryItems: [
      { title: 'product1', path: '/recipes/product1' },
      { title: 'product2', path: '/recipes/product2' },
      { title: 'product3', path: '/recipes/product3' },
      { title: 'product4', path: '/recipes/product4' },
      { title: 'product5', path: '/recipes/product5' },
      { title: 'product6', path: '/recipes/product6' },
      { title: 'product7', path: '/recipes/product7' },
    ],
  },
  {
    title: 'Multiple Nesting2',
    path: '/multiple/nesting2',
    categoryItems: [
      { title: 'product1', path: '/recipes/product1' },
      { title: 'product2', path: '/recipes/product2' },
      { title: 'product3', path: '/recipes/product3' },
      { title: 'product4', path: '/recipes/product4' },
      {
        title: 'product5',
        path: '/recipes/product5',
        categoryItems: [
          { title: 'product1', path: '/recipes/product1' },
          { title: 'product2', path: '/recipes/product2' },
          { title: 'product3', path: '/recipes/product3' },
          { title: 'product4', path: '/recipes/product4' },
          { title: 'product5', path: '/recipes/product5' },
          { title: 'product6', path: '/recipes/product6' },
          {
            title: 'product7',
            path: '/recipes/product7',
            categoryItems: [
              { title: 'product1', path: '/recipes/product1' },
              { title: 'product2', path: '/recipes/product2' },
              { title: 'product3', path: '/recipes/product3' },
              { title: 'product4', path: '/recipes/product4' },
              { title: 'product5', path: '/recipes/product5' },
              { title: 'product6', path: '/recipes/product6' },
              {
                title: 'product7',
                path: '/recipes/product7',
                categoryItems: [
                  { title: 'product1', path: '/recipes/product1' },
                  { title: 'product2', path: '/recipes/product2' },
                  { title: 'product3', path: '/recipes/product3' },
                  { title: 'product4', path: '/recipes/product4' },
                  { title: 'product5', path: '/recipes/product5' },
                  { title: 'product6', path: '/recipes/product6' },
                  { title: 'product7', path: '/recipes/product7' },
                ],
              },
            ],
          },
        ],
      },
      { title: 'product6', path: '/recipes/product6' },
      { title: 'product7', path: '/recipes/product7' },
    ],
  },
];
storiesOf('Generic/Sitemap', module)
  .add('default', () => <Sitemap content={content} wrapBlocks />, {
    info: { inline: false },
  })
  .add(
    'Sitemap custom title',
    () => (
      <Sitemap
        title={'Custom Sitemap Title'}
        titleLevel={TagName.h2}
        content={content}
        wrapBlocks
      />
    ),
    { info: { inline: false } }
  )
  .add(
    'with multiple nesting levels',
    () => (
      <Sitemap
        title={'Multiple nesing levels'}
        content={multipleNesting}
        wrapBlocks
      />
    ),
    { info: { inline: false } }
  );
