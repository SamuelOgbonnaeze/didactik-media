import { render, screen, fireEvent } from '@testing-library/react';
import { LegalDrawer } from '../LegalDrawer';
import { vi } from 'vitest';

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('react') as Record<string, unknown>;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  const forwardRef = actual.forwardRef as Function;

  return {
    motion: {
      div: forwardRef(({ children, ...props }: Record<string, unknown>, ref: unknown) => {
        // Filter out motion props
        const domProps = { ...props };
        ['initial', 'animate', 'exit', 'transition', 'drag', 'dragDirectionLock', 'onDragEnd', 'dragElastic', 'dragConstraints'].forEach(key => delete domProps[key]);
        return <div ref={ref as React.Ref<HTMLDivElement>} {...domProps}>{children as React.ReactNode}</div>;
      })
    },
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  };
});

describe('LegalDrawer', () => {
  it('does not render when isOpen is false', () => {
    const handleClose = vi.fn();
    render(
      <LegalDrawer isOpen={false} onClose={handleClose}>
        <div data-testid="legal-content">Legal Text</div>
      </LegalDrawer>
    );

    expect(screen.queryByTestId('legal-content')).not.toBeInTheDocument();
  });

  it('renders content when isOpen is true', () => {
    const handleClose = vi.fn();
    render(
      <LegalDrawer isOpen={true} onClose={handleClose}>
        <div data-testid="legal-content">Legal Text</div>
      </LegalDrawer>
    );

    expect(screen.getByTestId('legal-content')).toBeInTheDocument();
    expect(screen.getByText('Legal Text')).toBeInTheDocument();
  });

  it('calls onClose when clicking the close button', () => {
    const handleClose = vi.fn();
    render(
      <LegalDrawer isOpen={true} onClose={handleClose}>
        <div data-testid="legal-content">Legal Text</div>
      </LegalDrawer>
    );

    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
