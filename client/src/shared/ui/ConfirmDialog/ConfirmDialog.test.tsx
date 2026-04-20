import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ConfirmDialog } from './ConfirmDialog';

describe('ConfirmDialog', () => {
  it('renders nothing when closed', () => {
    const { container } = render(
      <ConfirmDialog
        description="Hidden"
        isOpen={false}
        title="Hidden dialog"
        onCancel={vi.fn()}
        onConfirm={vi.fn()}
      />
    );

    expect(container).toBeEmptyDOMElement();
  });

  it('calls cancel and confirm handlers', () => {
    const onCancel = vi.fn();
    const onConfirm = vi.fn();

    render(
      <ConfirmDialog
        confirmLabel="Delete"
        description="This habit will be soft deleted."
        isOpen
        title="Delete this habit?"
        onCancel={onCancel}
        onConfirm={onConfirm}
      />
    );

    fireEvent.click(screen.getByText('Cancel'));
    fireEvent.click(screen.getByText('Delete'));

    expect(onCancel).toHaveBeenCalledTimes(1);
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });
});
