import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import MessengerPage, { messengerWindowConfig } from './MessengerPage';
import Window from '../../window/Window';

export default {
    title: 'Example/MessengerPage',
    component: MessengerPage,
    parameters: {

    },
} as ComponentMeta<typeof MessengerPage>;

const Template: ComponentStory<typeof MessengerPage> = (args) => <MessengerPage {...args} />;

const windowWrapper: ComponentStory<typeof Window> = (args) => <Window {...args} />;


export const MessengerPageDefault = Template.bind({});
MessengerPageDefault.args = {
    windowConfig: windowWrapper
}