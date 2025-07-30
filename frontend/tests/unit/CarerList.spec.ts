import { mount } from '@vue/test-utils';
import CarerList from '@/components/CarerList.vue';

describe('CarerList', () => {
  it('renders a list of carers', () => {
    const carers = [
      { name: 'Anna', city: 'Debrecen', experience: 2, available: true },
      { name: 'Béla', city: 'Szeged', experience: 1, available: false },
    ];
    const wrapper = mount(CarerList, {
      props: { carers },
    });
    expect(wrapper.text()).toContain('Anna');
    expect(wrapper.text()).toContain('Béla');
  });
});
