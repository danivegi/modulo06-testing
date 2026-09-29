import { renderHook, act } from '@testing-library/react';
import { createEmptyLookup, Lookup } from '#common/models';
import { useConfirmationDialog } from './confirmation-dialog.hook';

describe('common/components/confirmation-dialog/useConfirmationDialog', () => {
  it('should return closed dialog and empty item as initial state', () => {
    // Arrange

    // Act
    const { result } = renderHook(() => useConfirmationDialog());

    // Assert
    expect(result.current.isOpen).toBe(false);
    expect(result.current.itemToDelete).toEqual(createEmptyLookup());
    expect(result.current.onAccept).toEqual(expect.any(Function));
    expect(result.current.onClose).toEqual(expect.any(Function));
    expect(result.current.onOpenDialog).toEqual(expect.any(Function));
  });

  it('should open the dialog and store the item when calling onOpenDialog', () => {
    // Arrange
    const item: Lookup = { id: '1', name: 'test name' };

    // Act
    const { result } = renderHook(() => useConfirmationDialog());
    act(() => {
      result.current.onOpenDialog(item);
    });

    // Assert
    expect(result.current.isOpen).toBe(true);
    expect(result.current.itemToDelete).toEqual(item);
  });

  it('should close the dialog when calling onClose', () => {
    // Arrange
    const item: Lookup = { id: '1', name: 'test name' };

    // Act
    const { result } = renderHook(() => useConfirmationDialog());
    act(() => {
      result.current.onOpenDialog(item);
    });
    act(() => {
      result.current.onClose();
    });

    // Assert
    expect(result.current.isOpen).toBe(false);
  });

  it('should reset itemToDelete when calling onAccept', () => {
    // Arrange
    const item: Lookup = { id: '1', name: 'test name' };

    // Act
    const { result } = renderHook(() => useConfirmationDialog());
    act(() => {
      result.current.onOpenDialog(item);
    });
    act(() => {
      result.current.onAccept();
    });

    // Assert
    expect(result.current.itemToDelete).toEqual(createEmptyLookup());
  });

  it('should close the dialog and reset the item after onAccept + onClose (accept flow)', () => {
    // Arrange
    const item: Lookup = { id: '1', name: 'test name' };

    // Act
    const { result } = renderHook(() => useConfirmationDialog());
    act(() => {
      result.current.onOpenDialog(item);
    });
    act(() => {
      result.current.onAccept();
      result.current.onClose();
    });

    // Assert
    expect(result.current.isOpen).toBe(false);
    expect(result.current.itemToDelete).toEqual(createEmptyLookup());
  });
});