import { Button } from '@/shared/ui/Button/Button';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export const ConfirmDialog = ({
  isOpen,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onCancel,
  onConfirm,
}: ConfirmDialogProps) => {
  if (!isOpen) return null;

  return (
    <div
      aria-modal="true"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-dark/35 px-4 backdrop-blur-sm"
      role="dialog"
    >
      <div className="glass-panel w-full max-w-md rounded-[2rem] border border-white/80 p-7 shadow-panel">
        <div className="inline-flex rounded-full bg-danger/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.28em] text-danger">
          Delete habit
        </div>
        <h2 className="mt-4 font-display text-3xl text-dark">{title}</h2>
        <p className="mt-3 leading-7 text-muted">{description}</p>
        <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button type="button" variant="secondary" className="px-5 py-3 text-base" onClick={onCancel}>
            {cancelLabel}
          </Button>
          <Button type="button" variant="danger" className="px-5 py-3 text-base" onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};
