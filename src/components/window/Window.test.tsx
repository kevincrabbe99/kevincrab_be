import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { frameReducer } from '../../reducers/frameReducer';
import Window from './Window';

// Mock the window content renderer
jest.mock('./WindowContent', () => ({
    renderWindowContent: () => <div data-testid="window-content">Content</div>
}));

// Mock windowDispatcher
jest.mock('../../dispatchers/windowDispatcher', () => ({
    windowDispatcher: {
        focusWindow: jest.fn()
    }
}));

const mockStore = configureStore({
    reducer: {
        frame: frameReducer,
        windows: () => ({
            maximizedWindows: [],
            windows: []
        })
    }
});

const mockWindowConfig = {
    id: 'test-window',
    type: 1,
    position: { x: 100, y: 100 },
    size: { width: 400, height: 300 },
    title: 'Test Window',
    icon: 'test.ico',
    showXButton: true,
    minimizable: true,
    maximizable: true
};

describe('Window Component', () => {
    const mockHandlers = {
        exitWindowHandler: jest.fn(),
        minimizeWindowHandler: jest.fn(),
        maximizeWindowHandler: jest.fn(),
        unmaximizeWindowHandler: jest.fn()
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders window with correct title', () => {
        render(
            <Provider store={mockStore}>
                <Window
                    windowConfig={mockWindowConfig}
                    {...mockHandlers}
                />
            </Provider>
        );

        expect(screen.getByText('Test Window')).toBeInTheDocument();
    });

    test('window does not follow cursor when not dragging', async () => {
        const { container } = render(
            <Provider store={mockStore}>
                <Window
                    windowConfig={mockWindowConfig}
                    {...mockHandlers}
                />
            </Provider>
        );

        const windowElement = container.querySelector('.window-wrapper') as HTMLElement;
        const initialLeft = windowElement?.style.left;
        const initialTop = windowElement?.style.top;

        // Simulate mouse move without dragging
        fireEvent.mouseMove(document, { clientX: 500, clientY: 500 });

        // Wait a bit for any state updates
        await waitFor(() => {
            const currentLeft = (windowElement as HTMLElement)?.style.left;
            const currentTop = (windowElement as HTMLElement)?.style.top;
            expect(currentLeft).toBe(initialLeft);
            expect(currentTop).toBe(initialTop);
        });
    });

    test('exit button calls exitWindowHandler', () => {
        render(
            <Provider store={mockStore}>
                <Window
                    windowConfig={mockWindowConfig}
                    {...mockHandlers}
                />
            </Provider>
        );

        const exitButton = screen.getByText('X');
        fireEvent.click(exitButton);

        expect(mockHandlers.exitWindowHandler).toHaveBeenCalledWith('test-window');
    });
});
