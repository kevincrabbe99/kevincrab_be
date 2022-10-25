import React from 'react';
import { ComponentStory, ComponentMeta, Story } from '@storybook/react';

import Window, { WindowProps } from './Window';
import { documentWindowConfig } from '../windowPages/document/DocumentPage';
import { Provider } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { store } from '../../store';
import { WindowConfig, windowReducer } from '../../reducers/windowReducer';
import { windowDispatcher } from '../../dispatchers/windowDispatcher';

// import styles
import './window.scss'

// mock providor storre state.windows
// the create story for Window component
// the story should be able to take in a windowConfig

export default {
    title: 'Example/Window',
    component: Window,
    parameters: {
        layout: 'fullscreen',
    },
} as ComponentMeta<typeof Window>;

// wrap with provider
const Template: ComponentStory<typeof Window> = (args) => 
            <Provider store={store}>
                <Window {...args} />
            </Provider>;


export const WindowDefault = Template.bind({});
WindowDefault.args = {
    windowConfig: documentWindowConfig
}

