import { mount } from '@vue/test-utils';
import CarerCard from '@/components/CarerCard.vue';

describe('CarerCard', () => {
  it('renders carer name and city', () => {
    const wrapper = mount(CarerCard, {
      props: {
        carer: { name: 'Anna', city: 'Debrecen', experience: 2, available: true },
      },
    });
    expect(wrapper.text()).toContain('Anna');
    expect(wrapper.text()).toContain('Debrecen');
  });
});
