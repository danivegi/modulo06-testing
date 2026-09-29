import React from 'react';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';

describe('common/components/ConfirmationDialogComponent', () => {
  const createProps = () => ({
    isOpen: true,
    onAccept: vi.fn(),
    onClose: vi.fn(),
    title: 'test title',
    labels: {
      closeButton: 'test close',
      acceptButton: 'test accept',
    },
    children: <p>test content</p>,
  });

  it('should render title, content and buttons when isOpen is true', () => {
    // Arrange
    const props = createProps();

    // Act
    render(<ConfirmationDialogComponent {...props} />);

    // Assert
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('test title')).toBeInTheDocument();
    expect(screen.getByText('test content')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'test close' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'test accept' })).toBeInTheDocument();
  });

  it('should not render the dialog when isOpen is false', () => {
    // Arrange
    const props = { ...createProps(), isOpen: false };

    // Act
    render(<ConfirmationDialogComponent {...props} />);

    // Assert
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.queryByText('test title')).not.toBeInTheDocument();
  });

  it('should render a ReactNode as title', () => {
    // Arrange
    const props = { ...createProps(), title: <span>test node title</span> };

    // Act
    render(<ConfirmationDialogComponent {...props} />);

    // Assert
    expect(screen.getByText('test node title')).toBeInTheDocument();
  });

  it('should call onClose but not onAccept when clicking the close button', async () => {
    // Arrange
    const props = createProps();

    // Act
    render(<ConfirmationDialogComponent {...props} />);
    await userEvent.click(screen.getByRole('button', { name: 'test close' }));

    // Assert
    expect(props.onClose).toHaveBeenCalledTimes(1);
    expect(props.onAccept).not.toHaveBeenCalled();
  });

  it('should call onAccept and then onClose when clicking the accept button', async () => {
    // Arrange
    const props = createProps();

    // Act
    render(<ConfirmationDialogComponent {...props} />);
    await userEvent.click(screen.getByRole('button', { name: 'test accept' }));

    // Assert
    expect(props.onAccept).toHaveBeenCalledTimes(1);
    expect(props.onClose).toHaveBeenCalledTimes(1);
    expect(props.onAccept.mock.invocationCallOrder[0]).toBeLessThan(
      props.onClose.mock.invocationCallOrder[0]
    );
  });
});