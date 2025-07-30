import { mount } from '@vue/test-utils';
import ChatBox from '@/components/ChatBox.vue';

describe('ChatBox', () => {
  it('renders input and send button', () => {
    const wrapper = mount(ChatBox, {
      props: { carerId: '1', userId: '2', name: 'Anna' },
      global: { stubs: ['FontAwesomeIcon'] },
    });
    expect(wrapper.find('input').exists()).toBe(true);
    expect(wrapper.text().toLowerCase()).toContain('küldés');
  });
});
