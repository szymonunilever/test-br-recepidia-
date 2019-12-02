import { mount } from 'enzyme';
import React, { ReactElement } from 'react';
import WithLocation, { WithLocationProps } from '../index';

describe('<Wizard />', () => {
  const MockComponent = ({ location }: any): ReactElement => {
    return <>{JSON.stringify(location)}</>;
  };
  const ComponentWithLocation = WithLocation<WithLocationProps>(MockComponent);

  it('should add location property', () => {
    const wrapper = mount(<MockComponent />);
    const wrapperWithLocation = mount(<ComponentWithLocation />);
    expect(wrapper.text()).toHaveLength(0);
    expect(!!wrapperWithLocation.text().length).toBeTruthy();
  });
});
