import React, { useState, useEffect } from 'react';
import { TabsProps, HeaderContent } from './models';
import theme from './Tabs.module.scss';
import cx from 'classnames';
import Button from '../Button';
import { Tab } from './partials';
import { TagName, Text } from 'src/components/lib/components/Text';

export const Tabs = ({
  className,
  content: { tabs },
  children = [],
  // @ts-ignore
  tabsHeaderContent,
  tabFromLocation = false,
  location,
}: TabsProps) => {
  const classWrapper = cx(theme.tabs, className);
  const [active, setActive] = useState();
  let tabItems: JSX.Element[], tabsContents: JSX.Element[];
  tabItems = tabs.map(tab => {
    const hasResultCount = typeof tab.resultsCount !== 'undefined';
    useEffect(
      () =>
        setActive(
          tabFromLocation
            ? location &&
                (location.search
                  ? new URLSearchParams(location.search).get('tabOpen')
                  : tabs[0].view)
            : tabs[0].view
        ),
      []
    );

    return (
      <Button
        key={tab.view}
        className="tabs__button"
        isToggle
        isDisabled={hasResultCount && !tab.resultsCount}
        role="tab"
        isSelected={active === tab.view}
        toggleExternalManage={true}
        onClick={() => setActive(tab.view)}
        attributes={
          active === tab.view
            ? {
                'aria-controls': `${tab.view}__tab`,
                id: `${tab.view}`,
              }
            : {
                'aria-controls': `${tab.view}__tab`,
                id: `${tab.view}`,
              }
        }
      >
        {tab.title}
        {hasResultCount ? ` (${tab.resultsCount})` : null}
      </Button>
    );
  });
  tabsContents = children.map(child => (
    <Tab
      key={child.props.view}
      active={active === child.props.view}
      attributes={
        active === child.props.view
          ? {
              role: 'tabpanel',
              'aria-labelledby': `${child.props.view}`,
              id: `${child.props.view}__tab`,
            }
          : {
              role: 'tabpanel',
              'aria-labelledby': `${child.props.view}`,
              id: `${child.props.view}__tab`,
            }
      }
      {...child.props}
    >
      {child.props.children}
    </Tab>
  ));

  const headerInfo =
    tabsHeaderContent &&
    tabsHeaderContent.contents.find(
      (item: HeaderContent) => active === item.view
    );

  return (
    <div className={classWrapper} data-componentname="tabs">
      {headerInfo && (
        <div className="tabs-header">
          <div className="tabs-header__heading">
            <Text tag={TagName.h2} text={headerInfo.heading} />
          </div>
          <div className="tabs-header__heading-subheading">
            <Text tag={TagName.h3} text={' '} />
          </div>
        </div>
      )}
      <div role="tablist" className="tabs__buttons">
        {tabItems}
      </div>
      <div className="tabs__items">{tabsContents}</div>
    </div>
  );
};

export default Tabs;
