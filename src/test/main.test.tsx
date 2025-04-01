import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

describe('ParamEditor Component', () => {
  test('renders with default params and values', () => {
    render(<App />);
    expect(screen.getByText('Редактор параметров')).toBeInTheDocument();
    expect(screen.getByLabelText('Назначение')).toBeInTheDocument();
  });

  test('updates param values when input changes', () => {
    render(<App />);
    const input = screen.getByLabelText('Назначение');
    fireEvent.change(input, { target: { value: 'новое значение' } });
    expect(input).toHaveValue('новое значение');
  });

  test('shows model data in modal when button clicked', async () => {
    render(<App />);
    fireEvent.click(screen.getByText('Показать модель'));
    expect(await screen.findByText('Текущая модель параметров')).toBeInTheDocument();
  });
  
  test('closes modal when footer close button is clicked', async () => {
    render(<App />);
    
    fireEvent.click(screen.getByText('Показать модель'));
    const modal = await screen.findByRole('dialog');
    
    const footerCloseButton = screen.getByLabelText('Закрыть модальное окно');
    fireEvent.click(footerCloseButton);
  
    await waitFor(() => {
      expect(modal).toHaveAttribute('aria-hidden', 'true');
      expect(modal).not.toHaveClass('show');
    });
  });
});