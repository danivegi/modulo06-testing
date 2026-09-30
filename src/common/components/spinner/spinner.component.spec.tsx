import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import { trackPromise } from 'react-promise-tracker';
import { SpinnerComponent } from './spinner.component';

// Promesa que resolvemos a mano desde el test
const createDeferred = () => {
  let resolve: () => void;
  const promise = new Promise<void>(res => {
    resolve = res;
  });
  return { promise, resolve: () => resolve() };
};

describe('common/components/SpinnerComponent', () => {
  it('should not render the spinner when there is no promise in progress', () => {
    // Arrange

    // Act
    render(<SpinnerComponent />);

    // Assert
    expect(screen.queryByRole('presentation')).not.toBeInTheDocument();
  });

  it('should render the spinner while a tracked promise is in progress', async () => {
    // Arrange
    const deferred = createDeferred();

    // Act
    render(<SpinnerComponent />);
    act(() => {
      trackPromise(deferred.promise);
    });

    // Assert
    expect(await screen.findByRole('presentation')).toBeInTheDocument();

    // si no resolvemos contamina el siguiente test
    await act(async () => {
      deferred.resolve();
      await deferred.promise;
    });
  });

  it('should hide the spinner when the tracked promise resolves', async () => {
    // Arrange
    const deferred = createDeferred();

    // Act
    render(<SpinnerComponent />);
    act(() => {
      trackPromise(deferred.promise);
    });
    expect(await screen.findByRole('presentation')).toBeInTheDocument();

    await act(async () => {
      deferred.resolve();
      await deferred.promise;
    });

    // Assert
    await waitFor(() => {
      expect(screen.queryByRole('presentation')).not.toBeInTheDocument();
    });
  });
});