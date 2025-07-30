import { mount } from '@vue/test-utils';
import GlobalChat from '@/components/GlobalChat.vue';

describe('GlobalChat', () => {
  it('renders chat title', () => {
    const wrapper = mount(GlobalChat);
    expect(wrapper.text().toLowerCase()).toContain('chat');
  });
});
