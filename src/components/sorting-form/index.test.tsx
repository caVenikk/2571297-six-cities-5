import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SortingForm } from './';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { SortOption } from '../../constants';
import { getSortOptionText } from '../../utils/sort';

const mockStore = configureMockStore();
const mockSetSortOption = vi.fn();

vi.mock('../../hooks', () => ({
  useActions: () => ({
    setSortOption: mockSetSortOption,
  }),
  useAppSelector: () => ({
    sortOption: SortOption.Popular,
  }),
}));

describe('Component: SortingForm', () => {
  const renderSortingForm = () => {
    const store = mockStore({
      common: {
        data: {
          sortOption: SortOption.Popular,
        },
      },
    });

    return render(
      <Provider store={store}>
        <SortingForm />
      </Provider>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render initial sort option correctly', () => {
    renderSortingForm();

    expect(screen.getByText('Sort by')).toBeInTheDocument();
    const sortingType = screen.getByRole('button', { name: getSortOptionText(SortOption.Popular) });
    expect(sortingType).toHaveClass('places__sorting-type');
  });

  it('should show options list when clicked', () => {
    renderSortingForm();

    const sortButton = screen.getByRole('button', { name: getSortOptionText(SortOption.Popular) });
    fireEvent.click(sortButton);

    const optionsList = screen.getByRole('list');
    expect(optionsList).toBeInTheDocument();

    // Check if all sort options are displayed
    Object.values(SortOption).forEach((option) => {
      const optionElement = screen.getByRole('listitem', { name: getSortOptionText(option as SortOption) });
      expect(optionElement).toBeInTheDocument();
    });
  });

  it('should hide options list by default', () => {
    renderSortingForm();

    const optionsList = screen.queryByRole('list');
    expect(optionsList).not.toBeInTheDocument();
  });

  it('should mark current option as active', () => {
    renderSortingForm();

    const sortButton = screen.getByRole('button', { name: getSortOptionText(SortOption.Popular) });
    fireEvent.click(sortButton);

    const activeOption = screen.getByRole('listitem', { name: getSortOptionText(SortOption.Popular) });
    expect(activeOption).toHaveClass('places__option--active');
  });

  it('should call setSortOption when option is selected', () => {
    renderSortingForm();

    // Open the options list
    const sortButton = screen.getByRole('button', { name: getSortOptionText(SortOption.Popular) });
    fireEvent.click(sortButton);

    // Click on a different option
    const newOption = screen.getByRole('listitem', { name: getSortOptionText(SortOption.PriceHighToLow) });
    fireEvent.click(newOption);

    expect(mockSetSortOption).toHaveBeenCalledWith(SortOption.PriceHighToLow);
  });

  it('should close options list after selection', () => {
    renderSortingForm();

    // Open the options list
    const sortButton = screen.getByRole('button', { name: getSortOptionText(SortOption.Popular) });
    fireEvent.click(sortButton);

    // Click on an option
    const option = screen.getByRole('listitem', { name: getSortOptionText(SortOption.PriceHighToLow) });
    fireEvent.click(option);

    // Check if the list is closed
    const optionsList = screen.queryByRole('list');
    expect(optionsList).not.toBeInTheDocument();
  });

  it('should have correct structure', () => {
    const { container } = renderSortingForm();

    expect(container.querySelector('.places__sorting')).toBeInTheDocument();
    expect(container.querySelector('.places__sorting-caption')).toBeInTheDocument();
    expect(container.querySelector('.places__sorting-type')).toBeInTheDocument();
    expect(container.querySelector('.places__sorting-arrow')).toBeInTheDocument();
  });
});
