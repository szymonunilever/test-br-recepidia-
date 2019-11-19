export const getComponentDataAttrs = (
  componentName: string,
  content?: AppContent.BaseContent
) => ({
  ['data-componentname']: componentName,
  ['data-componentview']:
    content && 'view' in content ? content.view : componentName,
});

export default getComponentDataAttrs;
