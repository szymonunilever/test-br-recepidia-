import React, { useState, useEffect } from 'react';
import { TabsProps, HeaderContent } from './models';
import theme from './Tabs.module.scss';
import cx from 'classnames';
import Button from '../Button';
import { Tab } from './partials';
import { TagName, Text } from 'src/components/lib/components/Text';
import get from 'lodash/get';

export const Tabs = ({
  className,
  content: { tabs },
  children = [],
  // @ts-ignore
  tabsHeaderContent,
  tabFromLocation = false,
  location,
  data,
}: TabsProps) => {
  const classWrapper = cx(theme.tabs, className);
  const [active, setActive] = useState();
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
  let tabItems: JSX.Element[], tabsContents: JSX.Element[];
  tabsContents = children.reduce(
    (accum, child) => {
      if (
        typeof child.props.visible === 'undefined' ||
        child.props.visible === true
      ) {
        const tab = (
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
        );
        return [...accum, tab];
      }
      return [...accum];
    },
    [] as JSX.Element[]
  );
  tabItems = tabs.reduce(
    (accum, tab) => {
      if (tabsContents.find(item => item.props.view === tab.view)) {
        const hasResultCount = typeof tab.resultsCount !== 'undefined';

        const tabItem = (
          <Button
            key={tab.view}
            className="tabs__button"
            isToggle
            isDisabled={hasResultCount && !tab.resultsCount}
            role="tab"
            isSelected={active === tab.view}
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
        return [...accum, tabItem];
      }
      return [...accum];
    },
    [] as JSX.Element[]
  );

  const headerInfo =
    tabsHeaderContent &&
    tabsHeaderContent.contents.find(
      (item: HeaderContent) => active === item.view
    );

  let subheading = get(
    get(children.find(child => child.props.view === active), 'props', {}),
    'hasContent',
    {}
  )
    ? get(headerInfo, 'subheading', '')
    : '';

  const processData = (input: string): string => {
    let processed = input;
    data &&
      data.forEach(item => {
        if (processed.includes(item.pattern)) {
          // @ts-ignore
          processed = processed.replace(item.pattern, item.replacement);
        }
      });
    return processed || '';
  };

  return (
    <div className={classWrapper} data-componentname="tabs">
      {headerInfo && (
        <div className="tabs-header">
          <div className="tabs-header__heading">
            <Text tag={TagName.h2} text={processData(headerInfo.heading)} />
          </div>
          <div className="tabs-header__heading-subheading">
            <Text tag={TagName.h3} text={processData(subheading)} />
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
