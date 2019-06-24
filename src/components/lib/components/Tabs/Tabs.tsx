import React, { useState } from 'react';
import { TabsProps } from './models';
import theme from './Tabs.module.scss';
import cx from 'classnames';
import Button from '../common/Button';
import { Tab } from './partials';

export const Tabs = ({
  className,
  content: { titles },
  children = [],
}: TabsProps) => {
  const classWrapper = cx(theme.tabs, className);
  const [active, setActive] = useState(titles[0]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let tabs: JSX.Element[], tabsContents: any;

  tabs = children.map((child, index) => (
    <Button
      key={index}
      className="tabs__button"
      isToggle
      isSelected={active === titles[index]}
      toggleExternalManage={true}
      onClick={() => setActive(titles[index])}
    >
      {titles[index]}
    </Button>
  ));

  tabsContents = children.map((child, index) => (
    <Tab key={index} active={active === titles[index]}>
      {child.props.children}
    </Tab>
  ));

  return (
    <div className={classWrapper}>
      <div className="tabs__buttons">{tabs}</div>
      <div className="tabs__items">{tabsContents}</div>
    </div>
  );
};

export default Tabs;
