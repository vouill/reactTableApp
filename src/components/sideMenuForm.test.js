import React from 'react'
import {shallow, mount} from 'enzyme';
import SideMenuFormComponent from './sideMenuForm.component'

describe('SideMenuFormComponent', () => {
    let Component
    let ComponentWithChildren
    const onUrlInput = jest.fn()
    beforeEach(() => {
        Component = shallow(
            <SideMenuFormComponent
                onUrlInput={onUrlInput}
            ></SideMenuFormComponent>
        );
        ComponentWithChildren = mount(
            <SideMenuFormComponent
                onUrlInput={onUrlInput}
            ></SideMenuFormComponent>
        );
    });
    it('should render', () => {
        expect(ComponentWithChildren.find('label')).toHaveLength(1)
         expect(Component).toMatchSnapshot();
    })

})