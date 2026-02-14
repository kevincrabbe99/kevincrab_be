import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ScopeProxy from './ScopeProxy';
import { frameReducer, FrameStatesEnum } from './reducers/frameReducer';
import { scopeReducer, ScopesEnum } from './reducers/scopeReducer';

// Mock the analytics
jest.mock('firebase/analytics', () => ({
    getAnalytics: jest.fn(() => ({})),
    Analytics: jest.fn()
}));

// Mock ga4
jest.mock('./util/ga4', () => ({
    ga4: {
        log: jest.fn()
    }
}));

// Mock the mappers
jest.mock('./util/mappers/mapSubdomainToScope', () => ({
    mapSubdomainToScope: jest.fn(() => ScopesEnum.NONE)
}));

jest.mock('./util/mappers/mapScopeToLandingPage', () => ({
    mapScopeToLandingPage: jest.fn(() => FrameStatesEnum.SHUTDOWN)
}));

// Mock CrtFilter
jest.mock('./frames/crtFilter/CrtFilter', () => {
    return function MockCrtFilter() {
        return <div data-testid="crt-filter">CRT Filter</div>;
    };
});

// Mock frameDispatcher
jest.mock('./dispatchers/frameDispatcher', () => ({
    frameDispatcher: {
        setState: jest.fn()
    }
}));

// Mock scopeDispatcher  
jest.mock('./dispatchers/scopeDispatcher', () => ({
    scopeDispatcher: {
        setScopes: jest.fn()
    }
}));

describe('ScopeProxy Component', () => {
    const createMockStore = (initialFrameState = FrameStatesEnum.SHUTDOWN) => {
        return configureStore({
            reducer: {
                frame: frameReducer,
                scopes: scopeReducer
            },
            preloadedState: {
                frame: {
                    state: initialFrameState,
                    useCrt: true
                },
                scopes: {
                    scopes: [ScopesEnum.NONE],
                    lastUpdated: Date.now().toString()
                }
            }
        });
    };

    beforeEach(() => {
        jest.clearAllMocks();
        // Reset document.cookie
        document.cookie = '';
    });

    test('redirects to landing page on initial load when scope requires it', async () => {
        const { frameDispatcher } = require('./dispatchers/frameDispatcher');
        const mockStore = createMockStore(FrameStatesEnum.LOGIN);

        render(
            <Provider store={mockStore}>
                <ScopeProxy />
            </Provider>
        );

        await waitFor(() => {
            expect(frameDispatcher.setState).toHaveBeenCalled();
        });
    });

    test('does not redirect when already on correct landing page', async () => {
        const { frameDispatcher } = require('./dispatchers/frameDispatcher');
        const mockStore = createMockStore(FrameStatesEnum.SHUTDOWN);

        render(
            <Provider store={mockStore}>
                <ScopeProxy />
            </Provider>
        );

        await waitFor(() => {
            // Should not redirect if already on landing page
            expect(frameDispatcher.setState).not.toHaveBeenCalled();
        });
    });

    test('sets scopes based on subdomain on mount', async () => {
        const { scopeDispatcher } = require('./dispatchers/scopeDispatcher');
        const mockStore = createMockStore();

        render(
            <Provider store={mockStore}>
                <ScopeProxy />
            </Provider>
        );

        await waitFor(() => {
            expect(scopeDispatcher.setScopes).toHaveBeenCalled();
        });
    });
});
