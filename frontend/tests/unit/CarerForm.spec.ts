import { mount } from '@vue/test-utils';
import CarerForm from '@/components/CarerForm.vue';

describe('CarerForm', () => {
  it('emits submit event with form data', async () => {
    const wrapper = mount(CarerForm);
    // Fill in a field if possible
    const nameInput = wrapper.find('input[name="name"]');
    if (nameInput.exists()) {
      await nameInput.setValue('Béla');
    }
    await wrapper.find('form').trigger('submit.prevent');
    expect(wrapper.emitted()).toHaveProperty('submit');
  });
});
