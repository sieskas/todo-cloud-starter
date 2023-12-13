import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import axios from 'axios';
import App from './App';
import '@testing-library/jest-dom'

jest.mock('axios');

describe('App tests', () => {
    test('adds a new todo', async () => {

        axios.get.mockResolvedValue({ data: [] });

        const mockResponse = { data: [{ title: 'New Todo' }] };
        axios.post.mockResolvedValue(mockResponse);

        render(<App />);

        axios.get.mockResolvedValue(mockResponse);
        const inputElement = screen.getByPlaceholderText("What needs to be done?");
        fireEvent.change(inputElement, { target: { value: 'New Todo' } });

        const addButton = screen.getByText("Add Todo");
        fireEvent.click(addButton);

        await waitFor(() => {
            expect(screen.getByText('New Todo')).toBeInTheDocument();
        });
    });
});
