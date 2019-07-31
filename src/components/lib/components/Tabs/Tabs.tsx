import React, { useState } from 'react';
import { TabsProps } from './models';
import theme from './Tabs.module.scss';
import cx from 'classnames';
import Button from '../Button';
import { Tab } from './partials';

export const Tabs = ({
  className,
  content: { tabs },
  children = [],
}: TabsProps) => {
  const classWrapper = cx(theme.tabs, className);
  const [active, setActive] = useState(tabs[0].view);
  let tabItems: JSX.Element[], tabsContents: JSX.Element[];
  tabItems = tabs.map(tab => (
    <Button
      key={tab.view}
      className="tabs__button"
      isToggle
      isSelected={active === tab.view}
      toggleExternalManage={true}
      onClick={() => setActive(tab.view)}
      attributes={
        active === tab.view
          ? {
              role: 'tab',
              'aria-selected': 'true',
              tabindex: 0,
              'aria-controls': `${tab.view}__tab`,
              id: `${tab.view}`,
            }
          : {
              role: 'tab',
              'aria-selected': 'false',
              tabindex: -1,
              'aria-controls': `${tab.view}__tab`,
              id: `${tab.view}`,
            }
      }
    >
      {tab.title}
    </Button>
  ));
  tabsContents = children.map(child => (
    <Tab
      key={child.props.view}
      active={active === child.props.view}
      attributes={
        active === child.props.view
          ? {
              role: 'tabpanel',
              tabindex: 0,
              'aria-labelledby': `${child.props.view}`,
              id: `${child.props.view}__tab`,
            }
          : {
              role: 'tabpanel',
              tabindex: 0,
              'aria-labelledby': `${child.props.view}`,
              id: `${child.props.view}__tab`,
            }
      }
      {...child.props}
    >
      {child.props.children}
    </Tab>
  ));

  return (
    <div className={classWrapper} data-componentname="tabs">
      <div role="tablist" className="tabs__buttons">
        {tabItems}
      </div>
      <div className="tabs__items">{tabsContents}</div>
    </div>
  );
};

export default Tabs;
