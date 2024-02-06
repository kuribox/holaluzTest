import { shallowMount } from '@vue/test-utils';
import ClientForm from './ClientForm.vue';

const mockData = {
  offers: { isRooftopRevolutionAllowed: true, discount: 10 },
  clientInfo: { name: 'John Doe', email: 'john@example.com' },
  supplyPointInfo: { address: '123 Main St', city: 'Example City' },
};

describe('ClientForm', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(ClientForm);

    wrapper.vm.fetchData = jest.fn();
  });

  it('renders form inputs correctly', async () => {
    const cupsInput = wrapper.find('input#cupsInput');
    expect(cupsInput.exists()).toBe(true);

    const searchButton = wrapper.find('button');
    expect(searchButton.exists()).toBe(true);
  });

  it('fetches data from server on button click', async () => {
    const fetchDataMock = jest.spyOn(wrapper.vm, 'fetchData');

    wrapper.find('button').trigger('click');

    await wrapper.vm.$nextTick();

    expect(fetchDataMock).toHaveBeenCalled();
  });

  it('updates the "cups" model when the input value changes', async () => {
    const input = wrapper.find('#cupsInput');
    await input.setValue('12345');
    expect(wrapper.vm.cups).toBe('12345');
  });

  it('calls "fetchData" when the search button is clicked', async () => {
    const button = wrapper.find('button');
    await button.trigger('click');
    expect(wrapper.vm.fetchData).toHaveBeenCalled();
  });

  it('displays information correctly when "fetchData" is successful', async () => {
    wrapper.vm.fetchData.mockImplementationOnce(() => {
      wrapper.setData({
        result: {
          offers: { isRooftopRevolutionAllowed: true, discount: 20 },
          clientInfo: { name: 'John Doe' },
          supplyPointInfo: { address: '123 Main St' },
        },
      });
    });

    await wrapper.vm.fetchData();
    await wrapper.vm.$nextTick();

    expect(wrapper.text()).toContain('isRooftopRevolutionAllowed: YES');
    expect(wrapper.text()).toContain('discount: 20%');
    expect(wrapper.text()).toContain('name: John Doe');
    expect(wrapper.text()).toContain('address: 123 Main St');
  });

  it('displays "NO" when "isRooftopRevolutionAllowed" is false', async () => {
    wrapper.vm.fetchData.mockImplementationOnce(() => {
      wrapper.setData({
        result: {
          offers: { isRooftopRevolutionAllowed: false },
          clientInfo: {},
          supplyPointInfo: {},
        },
      });
    });
  
    await wrapper.vm.fetchData();
    await wrapper.vm.$nextTick();
  
    expect(wrapper.text()).toContain('isRooftopRevolutionAllowed: NO');
  });

  it('displays "NO" when "discount" is 0', async () => {
    wrapper.vm.fetchData.mockImplementationOnce(() => {
      wrapper.setData({
        result: {
          offers: { isRooftopRevolutionAllowed: true, discount: 0 },
          clientInfo: {},
          supplyPointInfo: {},
        },
      });
    });
  
    await wrapper.vm.fetchData();
    await wrapper.vm.$nextTick();
  
    expect(wrapper.text()).toContain('discount: NO');
  });
});