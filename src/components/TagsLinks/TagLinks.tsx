import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { getTagSlug } from 'src/utils';
import { TagVariant } from 'src/components/lib/components/Tags/models';
import Tags from 'src/components/lib/components/Tags/Tags';

const addSlugToTags = (path: string, tags: Internal.Tag[]) =>
  tags.map(tag => ({
    ...tag,
    fields: { ...tag.fields, slug: getTagSlug(path, tag) },
  }));

const TagLinks: React.SFC<TagLinksProps> = ({
  list,
  initialCount = 8,
  tagsPerLoad = 4,
  variant = TagVariant.link,
  content = {},
}) => {
  const data: TagsData = useStaticQuery(graphql`
    {
      allPage(filter: { type: { eq: "ContentHub" } }) {
        nodes {
          relativePath
        }
      }
    }
  `);

  return (
    <Tags
      list={addSlugToTags(data.allPage.nodes[0].relativePath, list)}
      content={content}
      initialCount={initialCount}
      tagsPerLoad={tagsPerLoad}
      variant={variant}
    />
  );
};

interface TagsData {
  allPage: {
    nodes: {
      relativePath: string;
    }[];
  };
}

export interface TagLinksProps {
  list: Internal.Tag[];
  variant?: TagVariant;
  tagsPerLoad?: number;
  initialCount?: number | 'all';
  content: AppContent.TagsContent;
}

export default TagLinks;
